import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const trailingPosition = useRef({ x: -100, y: -100 });
  const ringRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    // Detect touch / non-pointer device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Check if hovering over interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest(
        'a, button, input, select, textarea, [role="button"], .cursor-pointer, [tabindex="0"]'
      );
      setIsHovering(Boolean(isInteractive));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    // Smooth trailing physics loop using lerp
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animateTrailing = () => {
      trailingPosition.current.x = lerp(trailingPosition.current.x, mousePosition.x, 0.18);
      trailingPosition.current.y = lerp(trailingPosition.current.y, mousePosition.y, 0.18);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${trailingPosition.current.x}px, ${trailingPosition.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameRef.current = requestAnimationFrame(animateTrailing);
    };

    animationFrameRef.current = requestAnimationFrame(animateTrailing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [mousePosition, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Central Precision Gold Dot */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-gold-primary transition-transform duration-75 ease-out shadow-[0_0_8px_rgba(212,175,55,0.8)] ${
          isHovering ? 'w-2 h-2 scale-75' : isClicked ? 'w-2 h-2 scale-50' : 'w-2 h-2'
        }`}
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) translate(-50%, -50%)`,
        }}
      />

      {/* Smooth Ambient Gold Trailing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border transition-all duration-300 ease-out will-change-transform ${
          isHovering
            ? 'w-12 h-12 border-gold-primary/80 bg-gold-primary/10 backdrop-blur-[1px] shadow-[0_0_20px_rgba(212,175,55,0.35)] scale-110'
            : isClicked
            ? 'w-7 h-7 border-gold-primary bg-gold-primary/20 scale-90'
            : 'w-8 h-8 border-gold-primary/40 bg-white/[0.02]'
        }`}
        style={{
          transform: `translate3d(${trailingPosition.current.x}px, ${trailingPosition.current.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </>
  );
}
