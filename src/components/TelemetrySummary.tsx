import { useState, useEffect, useRef } from 'react';
import { CheckCircle, Coffee, Award } from 'lucide-react';
import { useApp } from '../AppContext';

const CACHE_KEY = 'gh_repo_count_ts';
const CACHE_TTL = 60 * 60 * 1000;
const START_YEAR = 2023;

function AnimatedCounter({ value, duration = 2000, suffix = '' }: { value: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          let start = 0;
          const end = value;
          const totalFrames = Math.round(duration / 16.67);
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const easeProgress = progress * (2 - progress);
            const currentCount = Math.floor(easeProgress * end);

            if (frame >= totalFrames) {
              clearInterval(timer);
              setCount(end);
            } else {
              setCount(currentCount);
            }
          }, 16.67);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={containerRef}>{count}{suffix}</span>;
}

export default function TelemetrySummary() {
  const { t } = useApp();
  const [repoCount, setRepoCount] = useState(42);
  const yearsExp = new Date().getFullYear() - START_YEAR;

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { count, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        setRepoCount(count);
        return;
      }
    }
    fetch('https://api.github.com/users/rodolfo-riveros/repos?per_page=1')
      .then(res => {
        const link = res.headers.get('Link');
        if (link) {
          const match = link.match(/&page=(\d+)>; rel="last"/);
          if (match) {
            const count = parseInt(match[1], 10);
            setRepoCount(count);
            localStorage.setItem(CACHE_KEY, JSON.stringify({ count, timestamp: Date.now() }));
            return;
          }
        }
        return res.json().then((repos: unknown) => {
          if (Array.isArray(repos)) {
            setRepoCount(repos.length);
            localStorage.setItem(CACHE_KEY, JSON.stringify({ count: repos.length, timestamp: Date.now() }));
          }
        });
      })
      .catch(() => {});
  }, []);

  return (
    <section id="telemetry" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-reveal">
      <div className="text-center md:text-left mb-10">
        <p className="text-secondary font-mono text-xs tracking-[0.3em] uppercase">{t.bento.statsTitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="group border-beam rounded-xl bg-surface-container-low/30 p-[1px] transition-all duration-300 hover:scale-[1.01]">
          <div className="bg-[#050e18]/80 backdrop-blur-md rounded-xl overflow-hidden p-6 border border-outline-variant/20 transition-all duration-500 group-hover:border-secondary/50 flex items-center gap-5 relative">
            <div className="w-12 h-12 rounded-xl bg-[#0c1c2d]/80 border border-outline-variant/30 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-300">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-outline text-xs font-mono tracking-wider uppercase mb-1">{t.bento.statsProjects}</p>
              <p className="text-3xl md:text-4xl font-extrabold text-primary font-mono tracking-tight">
                <AnimatedCounter value={repoCount} suffix="+" />
              </p>
            </div>
          </div>
        </div>

        <div className="group border-beam rounded-xl bg-surface-container-low/30 p-[1px] transition-all duration-300 hover:scale-[1.01]">
          <div className="bg-[#050e18]/80 backdrop-blur-md rounded-xl overflow-hidden p-6 border border-outline-variant/20 transition-all duration-500 group-hover:border-secondary/50 flex items-center gap-5 relative">
            <div className="w-12 h-12 rounded-xl bg-[#0c1c2d]/80 border border-outline-variant/30 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-300">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <p className="text-outline text-xs font-mono tracking-wider uppercase mb-1">{t.bento.statsCoffee}</p>
              <p className="text-3xl md:text-4xl font-extrabold text-primary font-mono tracking-tight">
                <AnimatedCounter value={1840} suffix="+" />
              </p>
            </div>
          </div>
        </div>

        <div className="group border-beam rounded-xl bg-surface-container-low/30 p-[1px] transition-all duration-300 hover:scale-[1.01]">
          <div className="bg-[#050e18]/80 backdrop-blur-md rounded-xl overflow-hidden p-6 border border-outline-variant/20 transition-all duration-500 group-hover:border-secondary/50 flex items-center gap-5 relative">
            <div className="w-12 h-12 rounded-xl bg-[#0c1c2d]/80 border border-outline-variant/30 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-300">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-outline text-xs font-mono tracking-wider uppercase mb-1">{t.bento.statsExperience}</p>
              <p className="text-3xl md:text-4xl font-extrabold text-primary font-mono tracking-tight">
                <AnimatedCounter value={yearsExp} suffix="+" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
