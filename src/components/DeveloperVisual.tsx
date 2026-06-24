import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export default function DeveloperVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const rx = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const ry = (-(e.clientY - rect.top) / rect.height + 0.5) * 20;
      el.style.transform = `perspective(1000px) rotateX(${ry}deg) rotateY(${rx}deg)`;
    };
    const onMouseLeave = () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center select-none relative">
      {/* Glow backlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-secondary/15 rounded-full blur-[70px]" />

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md md:max-w-lg rounded-2xl overflow-hidden border border-primary/30 shadow-2xl shadow-primary/15"
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}
      >
        {/* Image with matrix binary rain */}
        <div className="relative">
          <img
            src="/img/img.png"
            alt="Rodolfo Riveros"
            className="w-full h-full block relative z-0"
          />
          {/* Binary rain overlay */}
          <div
            className="absolute inset-0 z-10 pointer-events-none overflow-hidden font-mono font-bold text-[10px] leading-[14px] tracking-[6px]"
            style={{
              color: 'rgba(0, 219, 233, 0.08)',
              wordBreak: 'break-all',
              animation: 'matrixRain 0.5s steps(1) infinite',
            }}
          >
            01001010 10101010 00101101 11010010 01101010 10101010 00101101 11010010 01001010 10101010 00101101 11010010 01101010 10101010 00101101 11010010
          </div>
          {/* Scanlines */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 219, 233, 0.04) 2px, rgba(0, 219, 233, 0.04) 4px)',
            }}
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
          <div className="bg-[#030303]/70 backdrop-blur-sm rounded-lg px-3 py-2 inline-block">
            <p className="text-primary font-headline font-bold text-sm">Rodolfo Riveros Mitma</p>
            <p className="text-secondary font-mono text-[10px] tracking-widest">ING. DE SISTEMAS / FULL-STACK</p>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes matrixRain {
          0% { opacity: 0.6; transform: translateY(-2px); }
          50% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0.6; transform: translateY(2px); }
        }
      `}</style>
    </div>
  );
}
