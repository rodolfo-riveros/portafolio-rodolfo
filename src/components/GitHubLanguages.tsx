import { useState, useEffect } from 'react';
import { Layers, RefreshCw, AlertCircle } from 'lucide-react';
import { useApp } from '../AppContext';

interface LangData {
  name: string;
  bytes: number;
  color: string;
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  PHP: '#4F5D95',
  Java: '#b07219',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Lua: '#000080',
  Shell: '#89e051',
  PowerShell: '#012456',
  SQL: '#e38c00',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Scala: '#c22d40',
  Perl: '#0298c3',
  Haskell: '#5e5086',
  Elm: '#60B5CC',
  Clojure: '#db5855',
  Elixir: '#6e4a7e',
  Erlang: '#B83998',
  R: '#198CE7',
  TeX: '#3D6117',
  Dockerfile: '#384d54',
  Makefile: '#427819',
  Markdown: '#083fa1',
  SCSS: '#c6538c',
  Less: '#1d365d',
};

const CACHE_KEY = 'github_langs_cache';
const CACHE_TTL = 60 * 60 * 1000;

export default function GitHubLanguages() {
  const { language } = useApp();
  const [languages, setLanguages] = useState<LangData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalBytes, setTotalBytes] = useState(0);

  const fetchLanguages = async () => {
    setLoading(true);
    setError(false);

    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          setLanguages(data.languages);
          setTotalBytes(data.totalBytes);
          setLoading(false);
          return;
        }
      }

      const reposRes = await fetch('https://api.github.com/users/rodolfo-riveros/repos?per_page=100&sort=updated');
      if (!reposRes.ok) throw new Error('Failed to fetch repos');
      const repos: { name: string; fork: boolean }[] = await reposRes.json();

      const langMap: Record<string, number> = {};

      const batchSize = 10;
      for (let i = 0; i < repos.length; i += batchSize) {
        const batch = repos.slice(i, i + batchSize).filter(r => !r.fork);
        const results = await Promise.all(
          batch.map(repo =>
            fetch(`https://api.github.com/repos/rodolfo-riveros/${repo.name}/languages`)
              .then(res => res.ok ? res.json() : {})
              .catch(() => ({}))
          )
        );
        for (const result of results) {
          for (const [lang, bytes] of Object.entries(result)) {
            langMap[lang] = (langMap[lang] || 0) + (bytes as number);
          }
        }
      }

      const total = Object.values(langMap).reduce((a, b) => a + b, 0);
      const sorted = Object.entries(langMap)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 12)
        .map(([name, bytes]) => ({
          name,
          bytes,
          color: LANG_COLORS[name] || '#849495',
        }));

      setLanguages(sorted);
      setTotalBytes(total);

      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data: { languages: sorted, totalBytes: total },
        timestamp: Date.now(),
      }));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  return (
    <div className="bg-[#020a13] border border-outline-variant/15 hover:border-secondary/30 transition-all rounded-xl p-4 md:p-5 shadow-inner h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-secondary" />
          <span className="text-[10px] font-mono text-outline tracking-wider uppercase">
            {language === 'en' ? 'LANGUAGE DISTRIBUTION' : 'DISTRIBUCIÓN DE LENGUAJES'}
          </span>
        </div>
        {!loading && !error && (
          <button
            onClick={fetchLanguages}
            className="text-outline/40 hover:text-secondary transition-colors cursor-pointer p-1"
            title={language === 'en' ? 'Refresh from GitHub' : 'Actualizar desde GitHub'}
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        )}
      </div>

      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px] font-mono text-outline/60">
              {language === 'en' ? 'Fetching repository data...' : 'Obteniendo datos de repositorios...'}
            </span>
          </div>
        </div>
      )}

      {error && (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-outline/60">
            <AlertCircle className="w-5 h-5 text-yellow-400/60" />
            <span className="text-[10px] font-mono text-center">
              {language === 'en' ? 'Could not load languages' : 'No se pudieron cargar los lenguajes'}
            </span>
            <button
              onClick={fetchLanguages}
              className="text-[9px] font-mono text-secondary hover:underline cursor-pointer mt-1"
            >
              {language === 'en' ? 'Retry' : 'Reintentar'}
            </button>
          </div>
        </div>
      )}

      {!loading && !error && languages.length === 0 && (
        <div className="flex-1 flex items-center justify-center text-[10px] font-mono text-outline/60">
          {language === 'en' ? 'No language data found' : 'No se encontraron datos de lenguajes'}
        </div>
      )}

      {!loading && !error && languages.length > 0 && (
        <div className="flex-1 flex flex-col justify-between gap-1.5 overflow-y-auto">
          {languages.map((lang) => {
            const pct = ((lang.bytes / totalBytes) * 100);
            return (
              <div key={lang.name} className="group">
                <div className="flex justify-between items-center mb-0.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full inline-block shrink-0"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-[10px] font-mono text-primary/80 font-medium">{lang.name}</span>
                  </div>
                  <span className="text-[9px] font-mono text-outline/60">{pct.toFixed(1)}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#122131] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, backgroundColor: lang.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
