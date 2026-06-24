import { useState } from 'react';
import { ArrowUpRight, Zap, Cpu, Activity, Terminal, Sparkles, Database, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../AppContext';

interface ProjectModalProps {
  projectKey: 'kunan' | 'sirea' | 'academico' | 'portal';
  onClose: () => void;
}

const projectStatic = {
  kunan: {
    tags: ['LARAVEL', 'PHP', 'MYSQL', 'ZKTECO', 'SMS GATEWAY'],
    externalUrl: 'https://kunan.profito.io/login',
  },
  sirea: {
    tags: ['REACT', 'EXPRESS', 'NODE.JS', 'MYSQL', 'MINEDU'],
    externalUrl: 'https://sirea.ugelurubamba.gob.pe/',
  },
  academico: {
    tags: ['LARAVEL', 'PHP', 'MYSQL', 'BOOTSTRAP', 'PDF'],
    externalUrl: 'https://sistema-academico.profito.io/',
  },
  portal: {
    tags: ['NEXT.JS', 'FASTAPI', 'PYTHON', 'POSTGRESQL', 'JWT'],
    externalUrl: 'https://portal-academico-la-salle.vercel.app/',
  }
};

function ProjectDetailsModal({ projectKey, onClose }: ProjectModalProps) {
  const { t } = useApp();
  const project = t.bento.projects[projectKey];
  const pStatic = projectStatic[projectKey];

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#030303]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-xl border border-primary/20 bg-[#071322] text-[#d4e4fa] shadow-2xl shadow-primary/10 p-6 md:p-8 glass-panel-heavy z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-outline hover:text-primary transition-colors text-xl font-mono p-2"
          >
            ✕
          </button>

          {/* Header */}
          <div className="mb-6">
            <span className="text-secondary text-xs font-mono tracking-widest uppercase block mb-1">{project.category}</span>
            <h3 className="font-headline text-3xl md:text-4xl text-primary font-bold tracking-tight">{project.title}</h3>
            <p className="text-outline text-lg mt-2 max-w-2xl">{project.description}</p>
          </div>

          <hr className="border-outline-variant/20 my-6" />

          {/* Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left side: details & specs */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <h4 className="font-headline font-semibold text-primary mb-3 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-secondary" /> {t.bento.modalOverview}
                </h4>
                <p className="text-sm leading-relaxed text-on-surface-variant whitespace-pre-line">
                  {project.details}
                </p>
              </div>

              <div>
                <h4 className="font-headline font-semibold text-primary mb-3 flex items-center gap-2">
                  <Database className="w-5 h-5 text-secondary" /> {t.bento.modalArchitecture}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.architecture.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-[#0d1c2d] p-3 rounded-lg border border-outline-variant/10 text-xs font-mono text-primary/90">
                      <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {pStatic.externalUrl && (
                <div className="pt-2">
                  <a
                    href={pStatic.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#4edea3] hover:bg-[#3bc68e] text-black font-mono text-xs rounded-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 font-bold border border-[#4edea3]/20"
                  >
                    <span>{t.nav.home === 'INICIO' ? 'VISITAR SITIO WEB' : 'LAUNCH LIVE SYSTEM'}</span>
                    <ArrowUpRight className="w-4 h-4 text-black shrink-0" />
                  </a>
                </div>
              )}
            </div>

            {/* Right side: stats & metrics */}
            <div className="md:col-span-5 space-y-6">
              <div className="bg-[#051424]/60 p-5 rounded-xl border border-primary/10">
                <h4 className="font-headline font-semibold text-primary mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary-fixed-dim" /> {t.bento.modalMetrics}
                </h4>
                <div className="space-y-4">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                      <span className="text-xs text-outline font-mono uppercase">{m.label}</span>
                      <div className="text-right">
                        <span className="text-md font-bold text-primary font-mono">{m.value}</span>
                        {m.trend && <span className="text-[10px] text-secondary font-mono block">{m.trend}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-headline font-semibold text-primary mb-3 text-sm font-mono tracking-widest uppercase">
                  {t.bento.techStack}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {pStatic.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#122131]/80 text-xs font-mono text-primary rounded-full border border-outline-variant/20 shadow-sm hover:border-secondary transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function BentoGrid() {
  const { t } = useApp();
  const [activeModal, setActiveModal] = useState<'kunan' | 'sirea' | 'academico' | 'portal' | null>(null);
  
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-reveal" id="work">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
        <div className="space-y-2">
          <p className="text-secondary font-mono text-xs tracking-[0.3em] uppercase">{t.bento.badge}</p>
          <h2 className="font-headline text-3xl md:text-5xl text-primary font-extrabold tracking-tight">{t.bento.title}</h2>
          <p className="text-outline text-md font-sans max-w-xl">
            {t.bento.subtitle}
          </p>
        </div>
        <div className="text-primary font-mono text-xs tracking-widest hidden md:block border border-outline-variant/30 px-4 py-2 rounded-full bg-[#0a1523]/50">
          {t.bento.status}
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Kunan */}
        <div 
          onClick={() => setActiveModal('kunan')}
          className="group border-beam cursor-pointer rounded-xl bg-surface-container-low/30 p-[1px] transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="bg-[#050e18]/80 backdrop-blur-md rounded-xl overflow-hidden h-full border border-outline-variant/20 transition-all duration-500 group-hover:border-primary/50 relative">
            <div className="p-5">
              <span className="font-mono text-[10px] text-secondary tracking-widest uppercase mb-1 block">{t.bento.projects.kunan.category}</span>
              <h3 className="font-headline text-lg text-primary font-bold group-hover:text-primary-container transition-colors mb-2">{t.bento.projects.kunan.title}</h3>
              <p className="text-outline text-xs leading-relaxed line-clamp-3">
                {t.bento.projects.kunan.description}
              </p>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden border border-outline-variant/20 bg-[#020912] shadow-inner shadow-black mx-5 mb-5 group-hover:shadow-primary/5">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&q=80')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020912]/80 via-transparent to-[#020912]/20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 bg-[#0a1523]/90 backdrop-blur-md p-2 rounded border border-outline-variant/30 flex justify-between items-center text-[8px] font-mono">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  <span>ZKTECO CONNECTED</span>
                </div>
                <span className="text-secondary font-bold">SMS ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: SIREA */}
        <div 
          onClick={() => setActiveModal('sirea')}
          className="group border-beam cursor-pointer rounded-xl bg-surface-container-low/30 p-[1px] transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="bg-[#050e18]/80 backdrop-blur-md rounded-xl overflow-hidden h-full border border-outline-variant/20 transition-all duration-500 group-hover:border-primary/50 relative">
            <div className="p-5">
              <span className="font-mono text-[10px] text-secondary tracking-widest uppercase mb-1 block">{t.bento.projects.sirea.category}</span>
              <h3 className="font-headline text-lg text-primary font-bold group-hover:text-primary-container transition-colors mb-2">{t.bento.projects.sirea.title}</h3>
              <p className="text-outline text-xs leading-relaxed line-clamp-3">
                {t.bento.projects.sirea.description}
              </p>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden border border-outline-variant/20 bg-[#020912] shadow-inner shadow-black mx-5 mb-5 group-hover:shadow-primary/5">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020912]/80 via-transparent to-[#020912]/20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 bg-[#0a1523]/90 backdrop-blur-md p-2 rounded border border-outline-variant/30 flex justify-between items-center text-[8px] font-mono">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  <span>MINEDU 326-2017</span>
                </div>
                <span className="text-secondary font-bold">UGEL ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Academico */}
        <div 
          onClick={() => setActiveModal('academico')}
          className="group border-beam cursor-pointer rounded-xl bg-surface-container-low/30 p-[1px] transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="bg-[#050e18]/80 backdrop-blur-md rounded-xl overflow-hidden h-full border border-outline-variant/20 transition-all duration-500 group-hover:border-primary/50 relative">
            <div className="p-5">
              <span className="font-mono text-[10px] text-secondary tracking-widest uppercase mb-1 block">{t.bento.projects.academico.category}</span>
              <h3 className="font-headline text-lg text-primary font-bold group-hover:text-primary-container transition-colors mb-2">{t.bento.projects.academico.title}</h3>
              <p className="text-outline text-xs leading-relaxed line-clamp-3">
                {t.bento.projects.academico.description}
              </p>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden border border-outline-variant/20 bg-[#020912] shadow-inner shadow-black mx-5 mb-5 group-hover:shadow-primary/5">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020912]/80 via-transparent to-[#020912]/20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 bg-[#0a1523]/90 backdrop-blur-md p-2 rounded border border-outline-variant/30 flex justify-between items-center text-[8px] font-mono">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  <span>INTRAnET ACTIVE</span>
                </div>
                <span className="text-secondary font-bold">EESPP LA SALLE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Portal Academico */}
        <div 
          onClick={() => setActiveModal('portal')}
          className="group border-beam cursor-pointer rounded-xl bg-surface-container-low/30 p-[1px] transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="bg-[#050e18]/80 backdrop-blur-md rounded-xl overflow-hidden h-full border border-outline-variant/20 transition-all duration-500 group-hover:border-primary/50 relative">
            <div className="p-5">
              <span className="font-mono text-[10px] text-secondary tracking-widest uppercase mb-1 block">{t.bento.projects.portal.category}</span>
              <h3 className="font-headline text-lg text-primary font-bold group-hover:text-primary-container transition-colors mb-2">{t.bento.projects.portal.title}</h3>
              <p className="text-outline text-xs leading-relaxed line-clamp-3">
                {t.bento.projects.portal.description}
              </p>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden border border-outline-variant/20 bg-[#020912] shadow-inner shadow-black mx-5 mb-5 group-hover:shadow-primary/5">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020912]/80 via-transparent to-[#020912]/20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 bg-[#0a1523]/90 backdrop-blur-md p-2 rounded border border-outline-variant/30 flex justify-between items-center text-[8px] font-mono">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  <span>NEXT.JS + FASTAPI</span>
                </div>
                <span className="text-secondary font-bold">IESP LA SALLE</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Detail Project Modals */}
      {activeModal && (
        <ProjectDetailsModal 
          projectKey={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </section>
  );
}
