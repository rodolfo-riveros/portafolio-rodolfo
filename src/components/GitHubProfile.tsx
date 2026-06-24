import { useState, useEffect } from 'react';
import { Database, Layers, Users, Star, GitBranch, Calendar } from 'lucide-react';
import { useApp } from '../AppContext';
import GitHubLanguages from './GitHubLanguages';

const CACHE_KEY = 'gh_meta_stats';
const CACHE_TTL = 60 * 60 * 1000;

interface GitHubMeta {
  followers: number;
  following: number;
  stars: number;
  forks: number;
  accountAge: string;
}

function formatMonths(months: number): string {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `~${m}m`;
  return `~${y}y ${m}m`;
}

export default function GitHubProfile() {
  const { language } = useApp();
  const [meta, setMeta] = useState<GitHubMeta | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        setMeta(data);
        return;
      }
    }

    const fetchMeta = async () => {
      try {
        const userRes = await fetch('https://api.github.com/users/rodolfo-riveros');
        const userData = await userRes.json();

        const reposRes = await fetch('https://api.github.com/users/rodolfo-riveros/repos?per_page=100');
        const repos: { stargazers_count: number; forks_count: number }[] = await reposRes.json();

        const stars = repos.reduce((s, r) => s + r.stargazers_count, 0);
        const forks = repos.reduce((s, r) => s + r.forks_count, 0);

        const created = new Date(userData.created_at);
        const now = new Date();
        const months = (now.getFullYear() - created.getFullYear()) * 12 + (now.getMonth() - created.getMonth());

        const data: GitHubMeta = {
          followers: userData.followers ?? 0,
          following: userData.following ?? 0,
          stars,
          forks,
          accountAge: formatMonths(months),
        };

        setMeta(data);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
      } catch {
        // silent
      }
    };

    fetchMeta();
  }, []);

  const statItems = meta ? [
    { icon: Users, label: language === 'en' ? 'FOLLOWERS' : 'SEGUIDORES', value: meta.followers },
    { icon: Users, label: language === 'en' ? 'FOLLOWING' : 'SIGUIENDO', value: meta.following },
    { icon: Star, label: language === 'en' ? 'STARS' : 'ESTRELLAS', value: meta.stars },
    { icon: GitBranch, label: language === 'en' ? 'FORKS' : 'FORKS', value: meta.forks },
    { icon: Calendar, label: language === 'en' ? 'ACCOUNT AGE' : 'ANTIGÜEDAD', value: meta.accountAge },
  ] : [];

  return (
    <section id="github-sync" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-reveal">
      {/* Stats & Languages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side - Stats + Streak in one card */}
        <div className="lg:col-span-7 bg-[#050e18]/50 border border-outline-variant/20 rounded-2xl p-6 shadow-xl shadow-black/40">
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#122131] border border-outline-variant/20 flex items-center justify-center text-primary">
                <Database className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-secondary font-mono text-[9px] tracking-widest uppercase block">{language === 'en' ? 'TELEMETRY' : 'TELEMETRÍA'}</span>
                <h3 className="font-headline text-xl font-bold text-primary">{language === 'en' ? 'GitHub System Statistics' : 'Estadísticas del Sistema de GitHub'}</h3>
              </div>
            </div>

            <p className="text-outline text-xs leading-relaxed max-w-xl">
              {language === 'en' 
                ? 'Comprehensive telemetry mapping including commit volume, pull requests, repository forks, and cumulative contributions.' 
                : 'Mapeo exhaustivo de telemetría que incluye volumen de commits, pull requests, forks de repositorios y contribuciones acumulativas.'}
            </p>
          </div>

          {/* GitHub meta stats bar */}
          {meta && (
            <div className="flex flex-wrap gap-3 mb-6">
              {statItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2 px-3 py-2 bg-[#020a13] rounded-lg border border-outline-variant/15 min-w-[100px] flex-1">
                  <item.icon className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <div className="text-left">
                    <p className="text-[9px] font-mono text-outline/60 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-bold font-mono text-primary">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Stats Badge */}
            <div className="bg-[#020a13] border border-outline-variant/15 hover:border-secondary/30 transition-all rounded-xl p-3 flex justify-center items-center shadow-inner h-52">
              <img 
                src="https://github-readme-stats.vercel.app/api?username=rodolfo-riveros&show_icons=true&locale=en&theme=dark" 
                alt="Rodolfo's GitHub Stats" 
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Streak Badge */}
            <div className="bg-[#020a13] border border-outline-variant/15 hover:border-secondary/30 transition-all rounded-xl p-3 flex justify-center items-center shadow-inner h-52">
              <img 
                src="https://github-readme-streak-stats.herokuapp.com/?user=rodolfo-riveros&theme=dark" 
                alt="Rodolfo's GitHub Streak" 
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Top Languages */}
        <div className="lg:col-span-5 bg-[#050e18]/50 border border-outline-variant/20 rounded-2xl p-6 flex flex-col justify-between shadow-xl shadow-black/40">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#122131] border border-outline-variant/20 flex items-center justify-center text-primary">
                <Layers className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-secondary font-mono text-[9px] tracking-widest uppercase block">{language === 'en' ? 'DISTRIBUTION' : 'DISTRIBUCIÓN'}</span>
                <h3 className="font-headline text-xl font-bold text-primary">{language === 'en' ? 'Top Languages' : 'Lenguajes Más Usados'}</h3>
              </div>
            </div>
            
            <p className="text-outline text-xs leading-relaxed">
              {language === 'en' 
                ? 'Live compilation metrics fetched directly from GitHub API across all repositories.' 
                : 'Métricas en vivo obtenidas directamente de la API de GitHub en todos los repositorios.'}
            </p>
          </div>

          <div className="mt-6 flex-1">
            <GitHubLanguages />
          </div>
        </div>

      </div>
    </section>
  );
}
