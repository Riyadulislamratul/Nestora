import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Disable on touch / mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onPointerMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Update dot position immediately with ZERO latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      if (!isVisible) setIsVisible(true);

      // Check if hovering over any interactive button, link, or clickable element
      const target = e.target;
      if (target) {
        const interactiveEl = target.closest(
          'a, button, input, select, textarea, [role="button"], label, .cursor-pointer, [tabindex]'
        );
        const computedCursor = window.getComputedStyle(target).cursor;
        const isPointer = Boolean(interactiveEl) || computedCursor === 'pointer';
        setIsHovering(isPointer);
      }
    };

    const onPointerDown = () => setIsClicked(true);
    const onPointerUp = () => setIsClicked(false);
    const onPointerLeave = () => setIsVisible(false);
    const onPointerEnter = () => setIsVisible(true);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('pointerenter', onPointerEnter);

    // Smooth trailing physics for the outer ring only
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const renderLoop = () => {
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.2);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.2);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('pointerenter', onPointerEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none select-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Central Precision Gold Dot - Instant 1:1 Response with Zero Lag */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none rounded-full bg-gold-primary transition-[width,height,background-color] duration-150 ease-out shadow-[0_0_10px_rgba(212,175,55,0.9)] will-change-transform ${
          isHovering
            ? 'w-1.5 h-1.5 bg-[#ffffff]'
            : isClicked
            ? 'w-1 h-1 bg-gold-primary scale-75'
            : 'w-2 h-2 bg-gold-primary'
        }`}
        style={{
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
        }}
      />

      {/* Smooth Trailing Follower Aura Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none rounded-full border transition-[width,height,border-color,background-color,box-shadow] duration-200 ease-out will-change-transform ${
          isHovering
            ? 'w-12 h-12 border-gold-primary/80 bg-gold-primary/15 backdrop-blur-[1px] shadow-[0_0_25px_rgba(212,175,55,0.4)]'
            : isClicked
            ? 'w-6 h-6 border-gold-primary bg-gold-primary/30 shadow-[0_0_15px_rgba(212,175,55,0.6)]'
            : 'w-8 h-8 border-gold-primary/40 bg-white/[0.02]'
        }`}
        style={{
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
