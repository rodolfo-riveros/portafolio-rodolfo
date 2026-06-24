import { useState, type ComponentType, type SVGProps } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Search, HelpCircle } from 'lucide-react';
import { useApp } from '../AppContext';
import {
  Angular, Bootstrap, CSS, Django, ExpressjsDark, Firebase,
  Figma, FlaskDark, Git, HTML5, JavaScript, Laravel, Linux,
  MarkdownDark, MongoDBDark, MySQLDark, Nodejs, PhpDark,
  PostgreSQL, Postman, Python, ReactDark, SQLite, TailwindCSS,
  TypeScript, UnityDark
} from '@ridemountainpig/svgl-react';

interface Tool {
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'database' | 'other';
  iconUrl: string;
  docUrl: string;
  proficiency: number;
  projectsCount: number;
}

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Angular, Bootstrap: Bootstrap, CSS: CSS, 'CSS3': CSS, Django, Express: ExpressjsDark,
  Firebase, Figma, Flask: FlaskDark, Git, HTML5, JavaScript,
  Laravel, Linux, Markdown: MarkdownDark, MongoDB: MongoDBDark,
  MySQL: MySQLDark, 'Node.js': Nodejs, PHP: PhpDark, PostgreSQL,
  Postman, Python, React: ReactDark, SQLite, 'Tailwind CSS': TailwindCSS,
  TypeScript, Unity: UnityDark
};

const tools: Tool[] = [
  { name: 'Angular', category: 'frontend', iconUrl: 'https://svgl.app/library/angular.svg', docUrl: 'https://angular.io', proficiency: 95, projectsCount: 8 },
  { name: 'React', category: 'frontend', iconUrl: 'https://svgl.app/library/react.svg', docUrl: 'https://reactjs.org/', proficiency: 100, projectsCount: 24 },
  { name: 'TypeScript', category: 'frontend', iconUrl: 'https://svgl.app/library/typescript.svg', docUrl: 'https://www.typescriptlang.org/', proficiency: 98, projectsCount: 20 },
  { name: 'JavaScript', category: 'frontend', iconUrl: 'https://svgl.app/library/javascript.svg', docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', proficiency: 100, projectsCount: 30 },
  { name: 'HTML5', category: 'frontend', iconUrl: 'https://svgl.app/library/html5.svg', docUrl: 'https://www.w3.org/html/', proficiency: 100, projectsCount: 35 },
  { name: 'CSS3', category: 'frontend', iconUrl: 'https://svgl.app/library/css3.svg', docUrl: 'https://www.w3schools.com/css/', proficiency: 100, projectsCount: 35 },
  { name: 'Tailwind CSS', category: 'frontend', iconUrl: 'https://svgl.app/library/tailwindcss.svg', docUrl: 'https://tailwindcss.com/', proficiency: 95, projectsCount: 15 },
  { name: 'Bootstrap', category: 'frontend', iconUrl: 'https://svgl.app/library/bootstrap.svg', docUrl: 'https://getbootstrap.com', proficiency: 90, projectsCount: 12 },

  { name: 'Node.js', category: 'backend', iconUrl: 'https://svgl.app/library/nodejs.svg', docUrl: 'https://nodejs.org', proficiency: 95, projectsCount: 18 },
  { name: 'Express', category: 'backend', iconUrl: 'https://svgl.app/library/express.svg', docUrl: 'https://expressjs.com', proficiency: 90, projectsCount: 15 },
  { name: 'Django', category: 'backend', iconUrl: 'https://svgl.app/library/django.svg', docUrl: 'https://www.djangoproject.com/', proficiency: 85, projectsCount: 6 },
  { name: 'Flask', category: 'backend', iconUrl: 'https://svgl.app/library/flask.svg', docUrl: 'https://flask.palletsprojects.com/', proficiency: 80, projectsCount: 4 },
  { name: 'Python', category: 'backend', iconUrl: 'https://svgl.app/library/python.svg', docUrl: 'https://www.python.org', proficiency: 95, projectsCount: 14 },
  { name: 'PHP', category: 'backend', iconUrl: 'https://svgl.app/library/php.svg', docUrl: 'https://www.php.net', proficiency: 90, projectsCount: 10 },
  { name: 'Laravel', category: 'backend', iconUrl: 'https://svgl.app/library/laravel.svg', docUrl: 'https://laravel.com/', proficiency: 88, projectsCount: 7 },
  { name: 'C++', category: 'backend', iconUrl: 'https://cdn.simpleicons.org/cplusplus/00dbe9', docUrl: 'https://www.w3schools.com/cpp/', proficiency: 82, projectsCount: 5 },

  { name: 'Android Studio', category: 'mobile', iconUrl: 'https://cdn.simpleicons.org/androidstudio/00dbe9', docUrl: 'https://developer.android.com/studio', proficiency: 85, projectsCount: 6 },
  { name: 'React Native', category: 'mobile', iconUrl: 'https://cdn.simpleicons.org/react/00dbe9', docUrl: 'https://reactnative.dev/', proficiency: 88, projectsCount: 5 },
  { name: 'Flutter', category: 'mobile', iconUrl: 'https://cdn.simpleicons.org/flutter/00dbe9', docUrl: 'https://flutter.dev', proficiency: 82, projectsCount: 4 },
  { name: 'Ionic', category: 'mobile', iconUrl: 'https://cdn.simpleicons.org/ionic/00dbe9', docUrl: 'https://ionicframework.com', proficiency: 78, projectsCount: 3 },

  { name: 'PostgreSQL', category: 'database', iconUrl: 'https://svgl.app/library/postgresql.svg', docUrl: 'https://www.postgresql.org', proficiency: 92, projectsCount: 12 },
  { name: 'MySQL', category: 'database', iconUrl: 'https://svgl.app/library/mysql.svg', docUrl: 'https://www.mysql.com/', proficiency: 90, projectsCount: 10 },
  { name: 'MongoDB', category: 'database', iconUrl: 'https://svgl.app/library/mongodb.svg', docUrl: 'https://www.mongodb.com/', proficiency: 88, projectsCount: 8 },
  { name: 'MSSQL', category: 'database', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg', docUrl: 'https://www.microsoft.com/en-us/sql-server', proficiency: 80, projectsCount: 5 },
  { name: 'SQLite', category: 'database', iconUrl: 'https://svgl.app/library/sqlite.svg', docUrl: 'https://www.sqlite.org/', proficiency: 85, projectsCount: 7 },

  { name: 'Firebase', category: 'other', iconUrl: 'https://svgl.app/library/firebase.svg', docUrl: 'https://firebase.google.com/', proficiency: 90, projectsCount: 9 },
  { name: 'Git', category: 'other', iconUrl: 'https://svgl.app/library/git.svg', docUrl: 'https://git-scm.com/', proficiency: 95, projectsCount: 30 },
  { name: 'Linux', category: 'other', iconUrl: 'https://svgl.app/library/linux.svg', docUrl: 'https://www.linux.org/', proficiency: 88, projectsCount: 12 },
  { name: 'Figma', category: 'other', iconUrl: 'https://svgl.app/library/figma.svg', docUrl: 'https://www.figma.com/', proficiency: 85, projectsCount: 10 },
  { name: 'Postman', category: 'other', iconUrl: 'https://svgl.app/library/postman.svg', docUrl: 'https://postman.com', proficiency: 90, projectsCount: 15 },
  { name: 'Unity', category: 'other', iconUrl: 'https://svgl.app/library/unity.svg', docUrl: 'https://unity.com/', proficiency: 75, projectsCount: 3 },
];

export default function TechEcosystem() {
  const { language } = useApp();
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'mobile' | 'database' | 'other'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredTool, setHoveredTool] = useState<Tool | null>(null);

  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const proficiencyColor = (pct: number) => {
    if (pct >= 95) return '#00f0ff';
    if (pct >= 85) return '#4edea3';
    if (pct >= 75) return '#dbfcff';
    return '#849495';
  };

  return (
    <section id="tech" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-reveal">
      <div className="bg-[#050e18]/30 border border-outline-variant/20 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-xl shadow-black/30">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-outline-variant/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#122131] border border-outline-variant/20 flex items-center justify-center text-secondary">
              <Settings className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-secondary font-mono text-[9px] tracking-widest uppercase block">
                {language === 'en' ? 'TECH ECOSYSTEM' : 'ECOSISTEMA TECNOLÓGICO'}
              </span>
              <h3 className="font-headline text-xl md:text-2xl font-bold text-primary">
                {language === 'en' ? 'Languages & Tools' : 'Lenguajes y Herramientas'}
              </h3>
            </div>
          </div>

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {(['all', 'frontend', 'backend', 'mobile', 'database', 'other'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full border tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-[#122131]/60 text-outline border-outline-variant/20 hover:border-secondary/50'
                }`}
              >
                {cat === 'all'
                  ? (language === 'en' ? 'ALL' : 'TODOS')
                  : cat === 'mobile'
                    ? (language === 'en' ? 'MOBILE' : 'MÓVIL')
                    : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="w-4 h-4 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === 'en' ? 'Search tool, compiler, library...' : 'Buscar herramienta, compilador, librería...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#030a13] border border-outline-variant/30 focus:border-secondary rounded-full py-3 pl-11 pr-6 text-sm text-primary outline-none focus:ring-1 focus:ring-secondary/20 transition-all font-mono"
          />
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          <AnimatePresence>
            {filteredTools.map((tool) => {
              const color = proficiencyColor(tool.proficiency);
              const SvgIcon = iconMap[tool.name];
              return (
                <motion.a
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={tool.name}
                  href={tool.docUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setHoveredTool(tool)}
                  onMouseLeave={() => setHoveredTool(null)}
                  className="group flex flex-col items-center justify-center p-4 bg-[#050e18]/80 border border-outline-variant/15 hover:border-secondary/40 hover:bg-[#0c1c2d]/40 rounded-xl transition-all duration-300 shadow-md cursor-pointer hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-[#020912] border border-outline-variant/10 rounded-lg p-2.5 flex items-center justify-center group-hover:scale-110 transition-transform relative mb-3">
                    {SvgIcon ? (
                      <SvgIcon className="w-full h-full" />
                    ) : (
                      <img
                        src={tool.iconUrl}
                        alt={tool.name}
                        className="max-h-full max-w-full group-hover:brightness-110 transition-all"
                        referrerPolicy="no-referrer"
                        style={{ filter: 'drop-shadow(0 0 2px rgba(0,219,233,0.25))' }}
                      />
                    )}
                  </div>
                  <span className="font-mono text-xs font-bold text-primary/90 text-center tracking-wider">{tool.name}</span>
                  <span className="text-[8px] font-mono text-outline/50 mt-1 uppercase tracking-widest">{tool.category}</span>
                  {/* Proficiency bar */}
                  <div className="w-full mt-2 h-1 bg-[#122131] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${tool.proficiency}%`, backgroundColor: color }}
                    />
                  </div>
                </motion.a>
              );
            })}
          </AnimatePresence>

          {filteredTools.length === 0 && (
            <div className="col-span-full py-12 text-center text-outline text-xs font-mono border border-dashed border-outline-variant/20 rounded-xl">
              {language === 'en' ? 'NO MATCHING SYSTEMS DETECTED' : 'NO SE DETECTARON SISTEMAS COMPATIBLES'}
            </div>
          )}
        </div>

        {/* Hover detail panel */}
        <div className="min-h-[6rem] sm:h-28 mt-8 w-full max-w-lg mx-auto flex items-center justify-center">
          <div className="relative w-full h-full">
            {hoveredTool ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full h-full bg-[#071322]/80 backdrop-blur-md rounded-xl border p-4 flex justify-between items-center"
                style={{ borderColor: `${proficiencyColor(hoveredTool.proficiency)}30` }}
              >
                <div className="space-y-1">
                  <span className="text-[9px] font-mono tracking-widest text-secondary uppercase block">{hoveredTool.category}</span>
                  <h4 className="font-headline font-bold text-lg text-primary">{hoveredTool.name}</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-[#122131] h-1.5 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${hoveredTool.proficiency}%`, backgroundColor: proficiencyColor(hoveredTool.proficiency) }}
                        className="h-full"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-outline">{hoveredTool.proficiency}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-mono text-primary">{hoveredTool.projectsCount}</span>
                  <span className="text-[9px] font-mono text-outline block uppercase">{language === 'en' ? 'SHIPPED' : 'ENTREGADOS'}</span>
                </div>
              </motion.div>
            ) : (
              <div className="w-full h-full bg-[#0b141f]/20 rounded-xl border border-outline-variant/10 p-4 flex items-center justify-center text-outline text-xs text-center border-dashed select-none">
                <HelpCircle className="w-4 h-4 mr-2 text-outline/50" />
                <span>{language === 'en' ? 'Hover over any tool above to see proficiency details' : 'Pasa el cursor sobre cualquier herramienta para ver detalles de dominio'}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
