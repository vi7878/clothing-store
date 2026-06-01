import { useState, useEffect, useRef } from 'react';

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show header at the top
      if (currentScrollY <= 10) {
        setScrollDirection('up');
        lastScrollY.current = currentScrollY;
        return;
      }

      // Ignore micro-scrolls (< 10px) to prevent jitter
      if (Math.abs(currentScrollY - lastScrollY.current) < 10) {
        return;
      }

      const isScrollingDown = currentScrollY > lastScrollY.current;
      const newDirection = isScrollingDown ? 'down' : 'up';

      // Update state only if direction changes
      if (newDirection !== scrollDirection) {
        setScrollDirection(newDirection);
      }

      lastScrollY.current = currentScrollY > 0 ? currentScrollY : 0;
    };

    // Optimize performance with requestAnimationFrame
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Passive listener for better mobile performance
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDirection]);

  return scrollDirection;
};
