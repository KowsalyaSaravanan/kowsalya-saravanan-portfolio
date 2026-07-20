
import React, { Suspense } from 'react';
import Background3D from './components/Background3D';
import AIBackground from './components/AIBackground';
import AIIntro from './components/AIIntro';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import { Home, User, Cpu, Briefcase, Mail, FolderGit2 } from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

// Icon mapping for dock
const DockIcon = ({ icon: Icon, label, target, scrollToSection, mouseX }: any) => {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Calculate distance from mouse to this icon
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Scale icon based on distance - disabled on mobile
  const widthSync = useTransform(distance, [-150, 0, 150], isMobile ? [42, 42, 42] : [40, 56, 40]);
  const width = useTransform(widthSync, (val) => val);

  return (
    <motion.a
      ref={ref}
      href="#"
      onClick={(e) => scrollToSection(e, target)}
      style={{ width: isMobile ? 42 : width }}
      className="aspect-square rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center relative group cursor-pointer hover:bg-white/20 transition-colors flex-shrink-0"
    >
      <Icon size={isMobile ? 17 : 18} className="text-white group-hover:text-primary transition-colors" />
      {/* Tooltip */}
      <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
        {label}
      </span>
    </motion.a>
  );
};

const App: React.FC = () => {
  const mouseX = useMotionValue(Infinity);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(id);
    if (element) {
      // Offset slightly less because we removed top nav, but kept bottom padding
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - 40, behavior: 'smooth' });
    }
  };

  const dockItems = [
    { icon: Home, label: 'Home', target: 'home' },
    { icon: User, label: 'About', target: '#about' },
    { icon: Cpu, label: 'Skills', target: '#skills' },
    { icon: FolderGit2, label: 'Projects', target: '#projects' },
    { icon: Briefcase, label: 'Exp', target: '#experience' },
    { icon: Mail, label: 'Contact', target: '#contact' },
  ];

  return (
    <div className="relative min-h-screen text-slate-200 font-sans selection:bg-primary/30 selection:text-white pb-28">
      {/* AI World Intro */}
      <AIIntro />

      <Suspense fallback={<div className="fixed inset-0 bg-[#0F172A]" />}>
        <Background3D />
      </Suspense>

      {/* AI Neural Network Background */}
      <AIBackground />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Holographic Dock Navigation */}
      <div 
        className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-end gap-2 px-2.5 md:px-3 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl max-w-[94vw] overflow-x-auto"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {dockItems.map((item, idx) => (
          <DockIcon 
            key={idx}
            {...item}
            mouseX={mouseX}
            scrollToSection={scrollToSection}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
