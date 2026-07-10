import { NextResponse } from 'next/server';

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Safely initialize Redis only if the environment variables are properly configured
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
let ratelimit: Ratelimit | null = null;

if (redisUrl && redisUrl.startsWith('https://')) {
  const redis = Redis.fromEnv();
  ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(20, '10 s'),
    analytics: true,
  });
}

export async function proxy(request: Request) {
  // Block common bad bots and scrapers to save resources
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const badBots = ['curl', 'wget', 'python-requests', 'python-urllib', 'libwww-perl', 'scrapy', 'postmanruntime'];
  if (badBots.some(bot => userAgent.includes(bot))) {
    return new NextResponse('Forbidden: Automated scraper detected', { status: 403 });
  }

  // If ratelimit isn't configured (e.g., missing env vars), just pass the request through
  if (!ratelimit) {
    return NextResponse.next();
  }

  // Extract IP securely to prevent spoofing attacks
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = realIp ?? (forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1');
  
  try {
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    // Return a 429 if the request is rate limited
    if (!success) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        }
      });
    }

    // Continue to next middleware or response
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', limit.toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    response.headers.set('X-RateLimit-Reset', reset.toString());
    
    return response;
  } catch (error) {
    // If Redis fails, we might want to log it and let the request pass 
    // to avoid blocking users when the rate limiter is down.
    console.error('Rate limiting error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (static files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
