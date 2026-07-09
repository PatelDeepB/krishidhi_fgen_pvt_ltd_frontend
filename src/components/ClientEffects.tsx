'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ClientEffects() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Theme initialization check
    const storedTheme = localStorage.getItem('krishidhi-theme-pref') || 'dark';
    if (storedTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }

    // 2. Custom mouse-trailing cursor glow
    const cursorGlow = document.getElementById('cursor-glow');
    let mX = 0, mY = 0;
    let currentX = 0, currentY = 0;

    const handleMouseMoveGlow = (e: MouseEvent) => {
      mX = e.clientX;
      mY = e.clientY;
    };

    document.addEventListener('mousemove', handleMouseMoveGlow);

    let animationFrameId: number;
    const loopCursor = () => {
      currentX += (mX - currentX) * 0.08;
      currentY += (mY - currentY) * 0.08;
      
      if (cursorGlow) {
        cursorGlow.style.left = `${currentX}px`;
        cursorGlow.style.top = `${currentY}px`;
      }
      animationFrameId = requestAnimationFrame(loopCursor);
    };
    loopCursor();

    // 3. Mouse grid parallax translation
    const gridOverlay = document.getElementById('grid-overlay');
    const handleMouseMoveParallax = (e: MouseEvent) => {
      if (gridOverlay) {
        const offsetX = (e.clientX - window.innerWidth / 2) * 0.025;
        const offsetY = (e.clientY - window.innerHeight / 2) * 0.025;
        gridOverlay.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
    };
    document.addEventListener('mousemove', handleMouseMoveParallax);

    // Active observers for page-specific elements
    let revealObserver: IntersectionObserver | null = null;
    const cardCleanupFns: (() => void)[] = [];

    // Run setup after Next.js hydration settles
    const timer = setTimeout(() => {
      // 3.5 Card Interactive Spotlight and 3D Tilt
      const cards = document.querySelectorAll('.node-panel, .spec-card, .editor-sidebar, .canvas-terminal, .spec-selector, .about-graphic-frame');
      cards.forEach(cardEl => {
        const card = cardEl as HTMLElement;
        let flatRect: DOMRect | null = null;

        const handleMouseMoveCard = (e: MouseEvent) => {
          if (!flatRect) {
            flatRect = card.getBoundingClientRect();
          }
          const x = e.clientX - flatRect.left;
          const y = e.clientY - flatRect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
          
          if (card.classList.contains('tilt-card')) {
            const width = flatRect.width;
            const height = flatRect.height;
            const xc = width / 2;
            const yc = height / 2;
            const dx = x - xc;
            const dy = y - yc;
            
            // Distance ratios from center (0 at center, 1 at edge)
            const ratioX = Math.abs(dx) / xc;
            const ratioY = Math.abs(dy) / yc;
            const maxRatio = Math.max(ratioX, ratioY);
            
            // Smoothly fade out the tilt multiplier in the outer boundary (20% to 10% zone)
            let fadeMultiplier = 1;
            if (maxRatio > 0.95) {
              fadeMultiplier = 0;
            } else if (maxRatio > 0.75) {
              fadeMultiplier = (0.95 - maxRatio) / 0.2;
            }

            const rx = -(dy / yc) * 3 * fadeMultiplier;
            const ry = (dx / xc) * 3 * fadeMultiplier;
            const scale = 1 + 0.01 * fadeMultiplier;
            
            card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${scale}, ${scale}, ${scale})`;
          }
        };

        const handleMouseLeaveCard = (e: MouseEvent) => {
          if (flatRect) {
            // Check if mouse is actually still inside the flat bounds (with 2px tolerance)
            const tol = 2;
            const isInside = 
              e.clientX >= flatRect.left - tol &&
              e.clientX <= flatRect.right + tol &&
              e.clientY >= flatRect.top - tol &&
              e.clientY <= flatRect.bottom + tol;
            
            if (isInside) {
              return; // Ignore false browser mouseleave!
            }
          }
          
          flatRect = null;
          if (card.classList.contains('tilt-card')) {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
          }
        };

        card.addEventListener('mousemove', handleMouseMoveCard);
        card.addEventListener('mouseleave', handleMouseLeaveCard);

        cardCleanupFns.push(() => {
          card.removeEventListener('mousemove', handleMouseMoveCard);
          card.removeEventListener('mouseleave', handleMouseLeaveCard);
        });
      });

      // 4. Scroll Reveal IntersectionObserver
      const revealEls = document.querySelectorAll('.reveal-fade');
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, { threshold: 0.05 });

      revealEls.forEach((el) => revealObserver?.observe(el));
    }, 150);

    // Page load class
    document.body.classList.add('page-loaded');

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousemove', handleMouseMoveGlow);
      document.removeEventListener('mousemove', handleMouseMoveParallax);
      cancelAnimationFrame(animationFrameId);
      
      if (revealObserver) {
        revealObserver.disconnect();
      }
      cardCleanupFns.forEach(fn => fn());
    };
  }, [pathname]);

  return null;
}
