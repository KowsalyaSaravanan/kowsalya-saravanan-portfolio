
import React from 'react';
import { Linkedin, Mail, Download, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../constants';

const Hero: React.FC = () => {
  const personal = PERSONAL_INFO;
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="relative z-10 min-h-[92vh] flex items-center justify-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto overflow-hidden pt-16 pb-24">
      

      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center flex flex-col items-center relative z-10 w-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-5 max-w-full px-4 py-2 rounded-lg border border-accent/30 bg-accent/5 backdrop-blur-sm"
        >
          <span className="block text-[11px] sm:text-xs md:text-sm font-semibold text-accent nothing-style leading-relaxed break-words">
            {personal.title}
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 tracking-normal leading-[1.08] text-center relative px-1 max-w-5xl"
        >
          <span className="text-white">Hi, I'm {personal.name.split(' ')[0]}.</span>
          <br />
          <span className="sr-only"> </span>
          <motion.span
            whileHover={{ scale: 1.02 }}
            className="inline-block bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent cursor-pointer relative group mt-2"
          >
            AI, ML & Backend Engineer
            <motion.div
              className="absolute -inset-2 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </motion.span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-sm sm:text-base md:text-lg text-slate-300 mb-8 md:mb-10 leading-7 max-w-3xl mx-auto text-center px-1"
        >
          {personal.tagline?.split(' ').map((word: string, idx: number) => {
            const isHighlight = ['intelligent', 'scalable', 'AI', 'solutions', 'data'].includes(word.toLowerCase().replace(/[.,]/g, ''));
            return (
              <motion.span
                key={idx}
                whileHover={isHighlight ? { scale: 1.1 } : {}}
                className={`inline-block mx-0.5 ${isHighlight ? 'cursor-pointer font-semibold text-accent hover:text-secondary transition-colors' : ''}`}
              >
                {word}
              </motion.span>
            );
          })}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 items-center justify-center px-1 w-full"
        >
          <motion.a 
            href="#"
            onClick={(e) => scrollToSection(e, '#projects')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-6 py-3 bg-gradient-to-r from-accent to-primary text-white font-semibold text-sm md:text-base rounded-lg overflow-hidden shadow-lg shadow-accent/20 w-full sm:w-auto text-center"
          >
            <span className="relative z-10">View Work</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          
          <motion.a
            href="/Kowsalya_Saravanan_AI_ML.pdf"
            download="Kowsalya_Saravanan_AI_ML.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2.5 px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-lg backdrop-blur-xl transition-all w-full sm:w-auto"
          >
            <Download size={18} />
            <span className="text-sm md:text-base">Download Resume</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Social Links - Floating */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed left-8 bottom-8 z-50 hidden lg:flex flex-col gap-3"
      >
        {personal.linkedin && (
          <motion.a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, x: 5 }}
            className="w-11 h-11 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-slate-400 hover:text-accent hover:bg-white/20 transition-all"
          >
            <Linkedin size={20} />
          </motion.a>
        )}
        {personal.github && (
          <motion.a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, x: 5 }}
            className="w-11 h-11 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-slate-400 hover:text-accent hover:bg-white/20 transition-all"
          >
            <Github size={20} />
          </motion.a>
        )}
        <motion.a
          href={`mailto:${personal.email}`}
          whileHover={{ scale: 1.2, x: 5 }}
          className="w-11 h-11 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-slate-400 hover:text-accent hover:bg-white/20 transition-all"
        >
          <Mail size={20} />
        </motion.a>
        
        {/* Vertical line */}
        <div className="w-0.5 h-20 bg-gradient-to-b from-accent to-transparent mx-auto" />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-slate-500 uppercase tracking-widest font-mono">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-accent/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-accent rounded-full"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
