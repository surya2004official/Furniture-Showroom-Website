import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

export const BeforeAfterSlider = ({
  beforeImage = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80",
  afterImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
  beforeLabel = "Bare Unfurnished Space",
  afterLabel = "AURA Living Bespoke Transformation",
  aspectRatio = "aspect-[16/9]"
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchend', handlePointerUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${aspectRatio} rounded-3xl overflow-hidden shadow-2xl border border-gold/40 select-none cursor-ew-resize group`}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* After Image (Background full) */}
      <img
        src={afterImage}
        alt="After Transformation"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute top-6 right-6 z-10 px-3.5 py-1.5 rounded-full bg-charcoal/80 text-gold text-xs font-semibold backdrop-blur-md border border-gold/40 flex items-center gap-1.5 shadow-lg">
        <Sparkles className="w-3.5 h-3.5 text-gold" />
        <span>{afterLabel}</span>
      </div>

      {/* Before Image (Clipped with inset/width) */}
      <div 
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before Transformation"
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          loading="lazy"
        />
        <div className="absolute top-6 left-6 z-10 px-3.5 py-1.5 rounded-full bg-charcoal/80 text-white/90 text-xs font-semibold backdrop-blur-md border border-white/20 shadow-lg">
          <span>{beforeLabel}</span>
        </div>
      </div>

      {/* Draggable Divider Line & Knob */}
      <div 
        className="absolute inset-y-0 z-20 w-0.5 bg-gold shadow-gold-glow flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-10 h-10 rounded-full bg-ivory text-charcoal flex items-center justify-center shadow-xl border-2 border-gold pointer-events-auto cursor-ew-resize transform -translate-x-1/2 hover:scale-110 active:scale-95 transition-transform">
          <SlidersHorizontal className="w-4 h-4 text-walnut" />
        </div>
      </div>

      {/* Helper hint */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-black/60 text-white/80 text-[11px] backdrop-blur-sm pointer-events-none transition-opacity group-hover:opacity-0">
        Drag slider left & right to compare
      </div>
    </div>
  );
};
