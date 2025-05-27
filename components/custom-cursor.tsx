'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if it's desktop
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 1024 && !('ontouchstart' in window));
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (!isDesktop) return;

    const updateMousePosition = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Direct transform without any animation library
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${clientX - 8}px, ${clientY - 8}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${clientX - 20}px, ${clientY - 20}px)`;
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners
    document.addEventListener('mousemove', updateMousePosition);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, [role="button"], .cursor-hover');

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      window.removeEventListener('resize', checkDevice);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Custom cursor dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-all duration-200 ease-out ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          willChange: 'transform',
        }}
      >
        <div
          className={`w-4 h-4 rounded-full transition-all duration-200 ${
            isHovering ? 'bg-lime-400 shadow-lg shadow-lime-400/50' : 'bg-lime-400'
          }`}
        />
      </div>

      {/* Custom cursor ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-300 ease-out ${
          isHovering ? 'scale-75 opacity-80' : 'scale-100 opacity-40'
        }`}
        style={{
          willChange: 'transform',
        }}
      >
        <div className="w-10 h-10 rounded-full border-2 border-lime-400/60" />
      </div>
    </>
  );
}
