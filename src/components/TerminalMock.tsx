import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal, ShieldAlert, Cpu, Layers, Sparkles, Check, Play, RefreshCw } from 'lucide-react';
import { useApp } from '../AppContext';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

const CACHE_KEY = 'gh_terminal_stats';
const CACHE_TTL = 60 * 60 * 1000;
const START_YEAR = 2023;

const LANG_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  HTML: '#e34c26', CSS: '#563d7c', PHP: '#4F5D95', Java: '#b07219',
  'C++': '#f34b7d', 'C#': '#178600', Ruby: '#701516', Go: '#00ADD8',
  Rust: '#dea584', Swift: '#F05138', Kotlin: '#A97BFF', Dart: '#00B4AB',
  Shell: '#89e051', SQL: '#e38c00', Vue: '#41b883', Scala: '#c22d40',
};

export default function TerminalMock() {
  const { t, language } = useApp();
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'sysio --version', type: 'input' },
    { text: 'sysio v4.0.2 (stable-rolling)', type: 'output' },
    { text: 'help', type: 'input' },
    { text: '  neofetch, work, skills, stats, contact, matrix, clear', type: 'output' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [repoCount, setRepoCount] = useState(42);
  const [followerCount, setFollowerCount] = useState(12);
  const [repos, setRepos] = useState<string[]>([]);
  const [languages, setLanguages] = useState<{ name: string; pct: number; color: string }[]>([]);

  const [commandHistory, setCommandHistory] = useState<string[]>(['sysio --version', 'help']);
  const [historyIndex, setHistoryIndex] = useState(2);

  const fetchData = useCallback(async () => {
    try {
      const [userRes, repoCountRes, reposRes] = await Promise.all([
        fetch('https://api.github.com/users/rodolfo-riveros'),
        fetch('https://api.github.com/users/rodolfo-riveros/repos?per_page=1'),
        fetch('https://api.github.com/users/rodolfo-riveros/repos?per_page=100&sort=updated'),
      ]);
      const userData = await userRes.json();
      const link = repoCountRes.headers.get('Link');
      let reposTotal = 0;
      if (link) {
        const match = link.match(/&page=(\d+)>; rel="last"/);
        if (match) reposTotal = parseInt(match[1], 10);
      }
      const reposData: { name: string; fork: boolean }[] = await reposRes.json();
      const repoNames = reposData.filter(r => !r.fork).map(r => r.name);

      const langMap: Record<string, number> = {};
      const batchSize = 10;
      for (let i = 0; i < reposData.length; i += batchSize) {
        const batch = reposData.slice(i, i + batchSize).filter(r => !r.fork);
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
        .slice(0, 8)
        .map(([name, bytes]) => ({
          name,
          pct: Math.round((bytes / total) * 100),
          color: LANG_COLORS[name] || '#849495',
        }));

      setRepoCount(reposTotal || reposData.length);
      setFollowerCount(userData.followers ?? 0);
      setRepos(repoNames);
      setLanguages(sorted);
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        repos: reposTotal || reposData.length,
        followers: userData.followers,
        repoList: repoNames,
        langList: sorted,
        timestamp: Date.now(),
      }));
    } catch { /* silent */ }
  }, []);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const d = JSON.parse(cached);
      if (Date.now() - d.timestamp < CACHE_TTL) {
        setRepoCount(d.repos);
        setFollowerCount(d.followers);
        if (d.repoList) setRepos(d.repoList);
        if (d.langList) setLanguages(d.langList);
        return;
      }
    }
    fetchData();
  }, [fetchData]);

  const yearsExp = new Date().getFullYear() - START_YEAR;

  // Focus input when clicking anywhere on the terminal container
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Scroll to bottom whenever history updates
  useEffect(() => {
    if (terminalEndRef.current) {
      const container = terminalEndRef.current.parentElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [history]);

  // Matrix Rain Simulation
  useEffect(() => {
    if (!isMatrixActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = 300;

    const matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@&%*+=-_";
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const rainDrops: number[] = Array.from({ length: columns }, () => 1);

    let animationId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#4edea3"; // Secondary green glow
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        // Custom highlight on leading drop
        if (Math.random() > 0.96) {
          ctx.fillStyle = "#dbfcff"; // Ice blue
        } else {
          ctx.fillStyle = "#00dbe9"; // Cyan accent
        }

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isMatrixActive]);

  // Command parsing logic
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputValue.trim();
    if (!command) return;

    // Save history
    const updatedHistory = [...history, { text: `${command}`, type: 'input' as const }];
    const updatedCmdHistory = [...commandHistory, command];
    setCommandHistory(updatedCmdHistory);
    setHistoryIndex(updatedCmdHistory.length);

    const lowerCmd = command.toLowerCase();

    let reply: TerminalLine[] = [];

    if (lowerCmd === 'help') {
      reply = language === 'en' ? [
        { text: 'Available commands:', type: 'success' },
        { text: '  neofetch  - Display system parameters & ASCII art', type: 'output' },
        { text: '  work      - Lists GitHub repositories', type: 'output' },
        { text: '  skills    - Shows top languages from GitHub', type: 'output' },
        { text: '  stats     - Shows real-time portfolio stats', type: 'output' },
        { text: '  contact   - Display contact information', type: 'output' },
        { text: '  matrix    - Launches retro digital rain', type: 'output' },
        { text: '  clear     - Wipes the console log', type: 'output' },
      ] : [
        { text: 'Comandos disponibles:', type: 'success' },
        { text: '  neofetch  - Muestra parámetros del sistema y arte ASCII', type: 'output' },
        { text: '  work      - Lista los repositorios de GitHub', type: 'output' },
        { text: '  skills    - Muestra los lenguajes principales de GitHub', type: 'output' },
        { text: '  stats     - Muestra las estadísticas en tiempo real', type: 'output' },
        { text: '  contact   - Muestra información de contacto', type: 'output' },
        { text: '  matrix    - Inicia lluvia digital retro', type: 'output' },
        { text: '  clear     - Limpia la consola', type: 'output' },
      ];
    } else if (lowerCmd === 'neofetch') {
      reply = t.terminal.neofetchAscii.map(line => ({ 
        text: line.replace('8+ Years Engineering Mastery', `${yearsExp}+ Years Engineering Mastery`),
        type: line.includes('------') || line.includes('root@') ? 'success' : 'output' 
      }));
    } else if (lowerCmd === 'work') {
      if (repos.length === 0) {
        reply = [{ text: language === 'en' ? 'Fetching repository data... please wait.' : 'Obteniendo datos de repositorios... espera un momento.', type: 'output' as const }];
        fetchData();
      } else {
        const header = language === 'en' ? `GitHub Repositories (${repos.length} total):` : `Repositorios de GitHub (${repos.length} total):`;
        reply = [
          { text: header, type: 'success' as const },
          ...repos.slice(0, 20).map(name => ({ text: `  ${'»'} ${name}`, type: 'output' as const })),
        ];
        if (repos.length > 20) {
          reply.push({ text: `  ... and ${repos.length - 20} more`, type: 'output' as const });
        }
      }
    } else if (lowerCmd === 'skills') {
      if (languages.length === 0) {
        reply = [{ text: language === 'en' ? 'Fetching language data... please wait.' : 'Obteniendo datos de lenguajes... espera un momento.', type: 'output' as const }];
        fetchData();
      } else {
        const header = language === 'en' ? 'Top Languages from GitHub:' : 'Lenguajes principales desde GitHub:';
        reply = [
          { text: header, type: 'success' as const },
          ...languages.map(l => {
            const bar = '█'.repeat(Math.round(l.pct / 5)) + '░'.repeat(Math.max(0, 20 - Math.round(l.pct / 5)));
            return { text: `  ${l.name.padEnd(12)} [${bar}] ${l.pct}%`, type: 'output' as const };
          }),
        ];
      }
    } else if (lowerCmd === 'stats') {
      reply = language === 'en' ? [
        { text: 'Fetching telemetry logs...', type: 'output' },
        { text: `✓ Telemetry acquired: Experience (${yearsExp}+ Years), Shipped (${repoCount}), Followers (${followerCount}).`, type: 'success' },
      ] : [
        { text: 'Obteniendo registros de telemetría...', type: 'output' },
        { text: `✓ Telemetría obtenida: Experiencia (${yearsExp}+ Años), Completados (${repoCount}), Seguidores (${followerCount}).`, type: 'success' },
      ];
    } else if (lowerCmd === 'contact') {
      reply = language === 'en' ? [
        { text: 'Establish Secure Connection Link:', type: 'success' },
        { text: '» E-mail: riveros70397516@gmail.com', type: 'output' },
        { text: '» GitHub: https://github.com/rodolfo-riveros', type: 'output' },
        { text: '» LinkedIn: https://linkedin.com/in/rodolfo-riveros', type: 'output' },
        { text: '» Status: OPEN for selective senior staff roles.', type: 'success' },
      ] : [
        { text: 'Establecer Enlace de Conexión Seguro:', type: 'success' },
        { text: '» Correo: riveros70397516@gmail.com', type: 'output' },
        { text: '» GitHub: https://github.com/rodolfo-riveros', type: 'output' },
        { text: '» LinkedIn: https://linkedin.com/in/rodolfo-riveros', type: 'output' },
        { text: '» Estado: ABIERTO para roles selectivos senior staff.', type: 'success' },
      ];
    } else if (lowerCmd === 'matrix') {
      setIsMatrixActive(true);
      reply = language === 'en' ? [
        { text: 'Matrix Digital Rain sequence initiated. Type any other command to exit matrix stream.', type: 'success' },
      ] : [
        { text: 'Secuencia de lluvia digital de Matrix iniciada. Escribe cualquier otro comando para salir.', type: 'success' },
      ];
    } else if (lowerCmd === 'clear') {
      setHistory([]);
      setInputValue('');
      return;
    } else {
      setIsMatrixActive(false);
      reply = language === 'en' ? [
        { text: `bash: command not found: ${command}`, type: 'error' },
        { text: 'Type "help" to view a list of authorized core commands.', type: 'output' },
      ] : [
        { text: `bash: comando no encontrado: ${command}`, type: 'error' },
        { text: 'Escribe "help" para ver una lista de comandos autorizados.', type: 'output' },
      ];
    }

    if (lowerCmd !== 'matrix') {
      setIsMatrixActive(false);
    }

    setHistory([...updatedHistory, ...reply]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // History traverse (Up Arrow)
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputValue(commandHistory[nextIdx] || '');
      }
    }
    // Down arrow
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputValue(commandHistory[nextIdx]);
      } else {
        setHistoryIndex(commandHistory.length);
        setInputValue('');
      }
    }
  };

  return (
    <section className="py-16 px-6 md:px-12 max-w-4xl mx-auto scroll-reveal">
      <div 
        onClick={handleTerminalClick}
        className="bg-[#03070d]/90 backdrop-blur-md rounded-xl border border-outline-variant/30 overflow-hidden shadow-2xl shadow-primary/5 cursor-text relative transition-all duration-300 hover:border-primary/40 group"
      >
        {/* Terminal Header */}
        <div className="bg-[#0b141f] px-6 py-3 flex items-center justify-between border-b border-outline-variant/20 select-none">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/40" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/40" />
            <div className="w-3 h-3 rounded-full bg-cyan-400/40" />
          </div>
          <span className="font-mono text-xs text-outline/80 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-secondary" /> root@sysio: ~/experiments
          </span>
          <div className="w-12" /> {/* spacing */}
        </div>

        {/* Matrix Canvas layer */}
        {isMatrixActive && (
          <div className="relative w-full h-[300px] border-b border-outline-variant/20">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            <div className="absolute top-4 right-4 bg-black/75 px-3 py-1.5 rounded text-[10px] font-mono border border-secondary/30 text-secondary animate-pulse">
              MATRIX RUNNING
            </div>
          </div>
        )}

        {/* Console logs */}
        <div className="p-6 md:p-8 font-mono text-xs md:text-sm text-primary/80 space-y-3 min-h-[320px] max-h-[500px] overflow-y-auto">
          {/* Welcome guide */}
          <div className="text-outline/70 border-b border-outline-variant/10 pb-4 mb-4 space-y-1 select-none">
            <p className="text-secondary font-bold">{t.terminal.welcomeTitle}</p>
            <p>{t.terminal.welcomeSubtitle}</p>
            <p>{t.terminal.welcomeHelp}</p>
          </div>

          {history.map((line, idx) => (
            <div key={idx} className="leading-relaxed">
              {line.type === 'input' ? (
                <div className="flex items-center gap-2">
                  <span className="text-secondary font-bold select-none">&gt;</span>
                  <span className="text-primary-container font-medium">{line.text}</span>
                </div>
              ) : (
                <pre className={`whitespace-pre-wrap ${
                  line.type === 'error' ? 'text-red-400' :
                  line.type === 'success' ? 'text-secondary font-semibold' :
                  'text-outline'
                }`}>{line.text}</pre>
              )}
            </div>
          ))}

          {/* Real-time stats cards shown under "fetch stats --portfolio" command */}
          {history.some(h => h.text.includes('fetch stats')) && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-outline pt-2 select-none animate-fadeIn">
              <div className="p-4 bg-[#0a1423]/60 rounded-lg border border-outline-variant/20 hover:border-primary/40 transition-colors">
                <p className="text-[10px] uppercase tracking-wider opacity-60 mb-1 font-sans">{t.terminal.exp}</p>
                <p className="text-primary text-xl font-bold font-headline">{yearsExp}+ {language === 'en' ? 'YEARS' : 'AÑOS'}</p>
                <span className="text-[9px] text-secondary font-mono block mt-1">{language === 'en' ? 'Staff-Level Core' : 'Nivel Staff Principal'}</span>
              </div>
              <div className="p-4 bg-[#0a1423]/60 rounded-lg border border-outline-variant/20 hover:border-primary/40 transition-colors">
                <p className="text-[10px] uppercase tracking-wider opacity-60 mb-1 font-sans">{t.terminal.shipped}</p>
                <p className="text-primary text-xl font-bold font-headline">{repoCount} {language === 'en' ? 'PROJECTS' : 'PROYECTOS'}</p>
                <span className="text-[9px] text-secondary font-mono block mt-1">{language === 'en' ? 'Production-Ready' : 'Listos para Producción'}</span>
              </div>
              <div className="p-4 bg-[#0a1423]/60 rounded-lg border border-outline-variant/20 hover:border-primary/40 transition-colors">
                <p className="text-[10px] uppercase tracking-wider opacity-60 mb-1 font-sans">{t.terminal.contrib}</p>
                <p className="text-primary text-xl font-bold font-headline">{followerCount} {language === 'en' ? 'FOLLOWERS' : 'SEGUIDORES'}</p>
                <span className="text-[9px] text-secondary font-mono block mt-1">GitHub Community</span>
              </div>
            </div>
          )}

          {/* Active input row */}
          <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-2">
            <span className="text-secondary font-bold select-none">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent text-primary-container outline-none border-none p-0 m-0 w-full focus:ring-0 font-mono caret-primary placeholder-outline/30 text-xs md:text-sm"
              placeholder={t.terminal.inputPlaceholder}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </form>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </section>
  );
}
