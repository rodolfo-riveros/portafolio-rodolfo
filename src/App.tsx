import { useState, useEffect } from 'react';
import { Terminal, Cpu, Database, Mail, Award, Github, Linkedin, Twitter, ChevronDown, MessageSquare, Languages, Instagram, Activity, Facebook, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from './AppContext';

// Import custom components
import InteractiveBackground from './components/InteractiveBackground';
import DeveloperVisual from './components/DeveloperVisual';
import BentoGrid from './components/BentoGrid';
import TelemetrySummary from './components/TelemetrySummary';
import GitHubProfile from './components/GitHubProfile';
import TechEcosystem from './components/TechEcosystem';
import TerminalMock from './components/TerminalMock';
import ConnectModal from './components/ConnectModal';
import ResumeModal from './components/ResumeModal';
import TypingAnimation from './components/magicui/typing-animation';

export default function App() {
  const { theme, toggleTheme, language, setLanguage, t } = useApp();
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Force scroll to top on mount to prevent browser scroll restoration
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Track page scrolls to dynamically illuminate the active dock navigation item
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      const heroSection = document.getElementById('home');
      const telemetrySection = document.getElementById('telemetry');
      const githubSection = document.getElementById('github-sync');
      const techSection = document.getElementById('tech');
      const workSection = document.getElementById('work');
      const terminalSection = document.getElementById('terminal');

      if (terminalSection && scrollPos >= terminalSection.offsetTop) {
        setActiveSection('sandbox');
      } else if (workSection && scrollPos >= workSection.offsetTop) {
        setActiveSection('projects');
      } else if (techSection && scrollPos >= techSection.offsetTop) {
        setActiveSection('skills');
      } else if (githubSection && scrollPos >= githubSection.offsetTop) {
        setActiveSection('github');
      } else if (telemetrySection && scrollPos >= telemetrySection.offsetTop) {
        setActiveSection('telemetry');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-[#d4e4fa] font-sans selection:bg-cyan-500/20 selection:text-primary overflow-x-hidden">
      {/* 1. Global WebGL Interactive Background */}
      <InteractiveBackground />

      {/* 2. Top Glass Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-40 backdrop-blur-md bg-[#030303]/40 border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-12 py-3 sm:py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('home')} 
            className="text-lg font-headline font-extrabold tracking-tighter text-primary cursor-pointer hover:scale-95 transition-transform shrink-0"
          >
            SYS<span className="text-secondary">.IO</span>
          </div>

          {/* Controls (Language, Connect & Links) */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="px-2.5 py-1 rounded-full border border-outline-variant/20 bg-[#0a1523]/30 hover:border-primary/40 text-primary transition-colors flex items-center gap-1 font-mono text-[10px] font-bold cursor-pointer"
              title="Cambiar Idioma / Toggle Language"
            >
              <Languages className="w-3 h-3 text-secondary" />
              <span>{language === 'en' ? 'EN' : 'ES'}</span>
            </motion.button>

            {/* Nav Links (Desktop Only) */}
            <div className="hidden md:flex gap-6 items-center font-mono text-xs tracking-wider ml-2 mr-2">
              <button 
                onClick={() => scrollToSection('telemetry')} 
                className={`hover:text-primary transition-colors py-1 cursor-pointer ${activeSection === 'telemetry' || activeSection === 'github' ? 'text-primary border-b border-primary' : 'text-outline'}`}
              >
                STATS
              </button>
              <button 
                onClick={() => scrollToSection('tech')} 
                className={`hover:text-primary transition-colors py-1 cursor-pointer ${activeSection === 'skills' ? 'text-primary border-b border-primary' : 'text-outline'}`}
              >
                {t.nav.tech}
              </button>
              <button 
                onClick={() => scrollToSection('work')} 
                className={`hover:text-primary transition-colors py-1 cursor-pointer ${activeSection === 'projects' ? 'text-primary border-b border-primary' : 'text-outline'}`}
              >
                {t.nav.work}
              </button>
              <button 
                onClick={() => scrollToSection('terminal')} 
                className={`hover:text-primary transition-colors py-1 cursor-pointer ${activeSection === 'sandbox' ? 'text-primary border-b border-primary' : 'text-outline'}`}
              >
                {t.nav.labs}
              </button>
              <button 
                onClick={() => setIsResumeOpen(true)} 
                className="text-outline hover:text-primary transition-colors py-1 cursor-pointer"
              >
                {t.nav.resume}
              </button>
            </div>

            <button 
              onClick={() => setIsConnectOpen(true)}
              className="px-4 py-2 bg-primary-container hover:bg-primary hover:text-on-primary text-on-primary-container rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md shadow-primary-container/10 cursor-pointer"
            >
              {t.nav.connect}
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Hero / Welcome Screen Section */}
      <section 
        id="home" 
        className="min-h-screen flex flex-col justify-center relative px-6 md:px-12 max-w-7xl mx-auto pt-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy - Left */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <p className="font-mono text-xs text-primary tracking-[0.35em] uppercase blur-reveal" style={{ animationDelay: '0.1s' }}>
              {t.hero.badge}
            </p>
            <h1 className="font-headline text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary tracking-tight leading-none blur-reveal" style={{ animationDelay: '0.2s' }}>
              <TypingAnimation
                text={t.hero.title1}
                duration={60}
                className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-fixed-dim to-secondary"
              />
            </h1>
            <p className="font-sans text-sm sm:text-md md:text-lg text-outline max-w-xl leading-relaxed blur-reveal" style={{ animationDelay: '0.3s' }}>
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 blur-reveal" style={{ animationDelay: '0.4s' }}>
              <button 
                onClick={() => scrollToSection('work')}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-300 shadow-lg shadow-primary/10 cursor-pointer"
              >
                {t.hero.exploreBtn}
              </button>
              <button 
                onClick={() => setIsConnectOpen(true)}
                className="px-6 sm:px-8 py-3 sm:py-4 border border-outline-variant/50 hover:border-secondary hover:text-secondary text-primary rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer"
              >
                {t.hero.touchBtn}
              </button>
            </div>
          </div>

          {/* Developer Visual Workspace - Right */}
          <div className="lg:col-span-5 flex items-center justify-center blur-reveal" style={{ animationDelay: '0.3s' }}>
            <div className="w-full relative">
              <DeveloperVisual />
            </div>
          </div>
        </div>

        {/* Floating Down Scroll indicator */}
        <div 
          onClick={() => scrollToSection('work')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer select-none"
        >
          <span className="font-mono text-[9px] tracking-widest">{t.hero.scroll}</span>
          <ChevronDown className="w-4 h-4 text-primary animate-bounce" />
        </div>
      </section>

      {/* 4. Telemetry & GitHub Section */}
      <div className="border-t border-outline-variant/10 bg-[#030d1a]/25">
        <TelemetrySummary />
        <GitHubProfile />
      </div>

      {/* Tech Ecosystem Section */}
      <TechEcosystem />

      {/* 5. Portfolio Grid Section (work) */}
      <div className="border-t border-outline-variant/10 bg-[#020a13]/30">
        <BentoGrid />
      </div>

      {/* 6. Terminal Interactive Section (Labs) */}
      <div id="terminal" className="border-t border-outline-variant/10 bg-[#020a13]/20 py-24">
        <div className="px-6 md:px-12 max-w-7xl mx-auto text-center space-y-4 mb-12">
          <p className="text-secondary font-mono text-xs tracking-[0.35em] uppercase">{t.terminal.badge}</p>
          <h2 className="font-headline text-3xl md:text-5xl text-primary font-extrabold tracking-tight">{t.terminal.title}</h2>
          <p className="text-outline text-md font-sans max-w-xl mx-auto">
            {t.terminal.subtitle}
          </p>
        </div>
        <TerminalMock />
      </div>

      {/* 7. Footer Call To Action & Links */}
      <footer className="pt-24 pb-44 px-6 md:px-12 text-center border-t border-outline-variant/10 bg-[#030912]/80 backdrop-blur-md relative" style={{ paddingBottom: 'calc(11rem + env(safe-area-inset-bottom, 0px))' }}>
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="px-4 py-1.5 rounded-full bg-[#122131] border border-outline-variant/20 text-xs font-mono text-secondary tracking-widest uppercase">
            {t.footer.badge}
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl md:text-6xl font-extrabold text-primary tracking-tight leading-none">
            {t.footer.title.split('\n')[0]}<br />{t.footer.title.split('\n')[1] || ''}
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-4">
            <button 
              onClick={() => setIsConnectOpen(true)}
              className="px-6 sm:px-10 py-3 sm:py-5 bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary rounded-full font-mono text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 shadow-xl shadow-primary/15 hover:scale-105 cursor-pointer"
            >
              {t.footer.touchBtn}
            </button>
            <button 
              onClick={() => setIsResumeOpen(true)}
              className="px-6 sm:px-10 py-3 sm:py-5 border border-outline-variant/50 hover:border-secondary hover:text-secondary text-primary rounded-full font-mono text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              {t.footer.resumeBtn}
            </button>
          </div>

          <hr className="border-outline-variant/10 my-16" />

          {/* Social connections & Copyright info */}
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-outline opacity-60 font-mono text-[10px] tracking-[0.25em] uppercase space-y-4 md:space-y-0">
            <p>© {new Date().getFullYear()} {t.footer.rights}</p>
            
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 items-center">
              <a href="https://twitter.com/mitmariveros" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                <Twitter className="w-3.5 h-3.5" /> TWITTER
              </a>
              <a href="https://github.com/rodolfo-riveros" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                <Github className="w-3.5 h-3.5" /> GITHUB
              </a>
              <a href="https://www.facebook.com/rodolfo.riveros.9843?locale=es_LA" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                <Facebook className="w-3.5 h-3.5" /> FACEBOOK
              </a>
              <a href="https://wa.me/5192787726?text=Hola%20Rodolfo%2C%20vi%20tu%20portafolio%20y%20me%20gustaria%20contactarte" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5" /> WHATSAPP
              </a>
              <a href="https://instagram.com/rodolforiverosmitma" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                <Instagram className="w-3.5 h-3.5" /> INSTAGRAM
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* 8. Bottom Pill-style Floating Navigation Dock */}
      <nav className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-2 sm:gap-4 px-2 sm:px-4 py-2 bg-[#020b13]/60 backdrop-blur-xl border border-outline-variant/30 rounded-full shadow-2xl shadow-black/80 max-w-[92vw] overflow-x-auto scrollbar-none" style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))' }}>
        
        {/* Home */}
        <button 
          onClick={() => scrollToSection('home')}
          className={`flex flex-col items-center justify-center rounded-full p-1.5 sm:p-2.5 transition-all duration-200 hover:scale-110 cursor-pointer shrink-0 ${activeSection === 'home' ? 'bg-primary/15 text-primary' : 'text-outline hover:text-primary'}`}
          title={t.nav.home}
        >
          <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="font-mono text-[7px] sm:text-[8px] mt-0.5 sm:mt-1 font-bold whitespace-nowrap">{t.nav.home}</span>
        </button>

        {/* Stats */}
        <button 
          onClick={() => scrollToSection('telemetry')}
          className={`flex flex-col items-center justify-center rounded-full p-1.5 sm:p-2.5 transition-all duration-200 hover:scale-110 cursor-pointer shrink-0 ${activeSection === 'telemetry' || activeSection === 'github' ? 'bg-primary/15 text-primary' : 'text-outline hover:text-primary'}`}
          title="STATS"
        >
          <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="font-mono text-[7px] sm:text-[8px] mt-0.5 sm:mt-1 font-bold whitespace-nowrap">STATS</span>
        </button>

        {/* Tech */}
        <button 
          onClick={() => scrollToSection('tech')}
          className={`flex flex-col items-center justify-center rounded-full p-1.5 sm:p-2.5 transition-all duration-200 hover:scale-110 cursor-pointer shrink-0 ${activeSection === 'skills' ? 'bg-primary/15 text-primary' : 'text-outline hover:text-primary'}`}
          title={t.nav.tech}
        >
          <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="font-mono text-[7px] sm:text-[8px] mt-0.5 sm:mt-1 font-bold whitespace-nowrap">{t.nav.tech}</span>
        </button>

        {/* Work */}
        <button 
          onClick={() => scrollToSection('work')}
          className={`flex flex-col items-center justify-center rounded-full p-1.5 sm:p-2.5 transition-all duration-200 hover:scale-110 cursor-pointer shrink-0 ${activeSection === 'projects' ? 'bg-primary/15 text-primary' : 'text-outline hover:text-primary'}`}
          title={t.nav.work}
        >
          <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="font-mono text-[7px] sm:text-[8px] mt-0.5 sm:mt-1 font-bold whitespace-nowrap">{t.nav.work}</span>
        </button>

        {/* Labs */}
        <button 
          onClick={() => scrollToSection('terminal')}
          className={`flex flex-col items-center justify-center rounded-full p-1.5 sm:p-2.5 transition-all duration-200 hover:scale-110 cursor-pointer shrink-0 ${activeSection === 'sandbox' ? 'bg-primary/15 text-primary' : 'text-outline hover:text-primary'}`}
          title={t.nav.labs}
        >
          <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="font-mono text-[7px] sm:text-[8px] mt-0.5 sm:mt-1 font-bold whitespace-nowrap">{t.nav.labs}</span>
        </button>

        {/* Contact */}
        <button 
          onClick={() => setIsConnectOpen(true)}
          className={`flex flex-col items-center justify-center rounded-full p-1.5 sm:p-2.5 transition-all duration-200 hover:scale-110 cursor-pointer shrink-0 ${isConnectOpen ? 'bg-primary/15 text-primary' : 'text-outline hover:text-primary'}`}
          title={t.nav.connect}
        >
          <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="font-mono text-[7px] sm:text-[8px] mt-0.5 sm:mt-1 font-bold whitespace-nowrap">{t.nav.connect}</span>
        </button>
      </nav>

      {/* 9. Connected Modals portals */}
      <ConnectModal isOpen={isConnectOpen} onClose={() => setIsConnectOpen(false)} />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}
