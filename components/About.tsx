import React from 'react';
import Section from './Section';
import { Brain, Database, Eye, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { ABOUT } from '../constants';

const iconMap: any = {
  Brain,
  Database,
  Eye,
  Rocket
};

const About: React.FC = () => {
  const about = ABOUT;

  return (
    <Section id="about" title="About Me">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 md:mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-white leading-tight font-display max-w-4xl mx-auto"
            dangerouslySetInnerHTML={{ __html: about.heading.replace('Intelligent Solutions', '<span class="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Intelligent Solutions</span>') }}
          />
          
          <div className="space-y-5 text-base md:text-lg text-slate-300 max-w-4xl mx-auto">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="leading-8 text-center"
            >
              {about.summary}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="leading-8 text-center"
            >
              {about.description}
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-20 max-w-4xl mx-auto">
          {about.stats?.map((stat: any, index: number) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="p-6 bg-white/5 rounded-lg border border-white/10 text-center hover:bg-white/10 transition-all"
            >
              <h4 className={`text-3xl md:text-4xl font-bold mb-2 font-display ${
                stat.color === 'accent' ? 'text-accent' : 
                stat.color === 'secondary' ? 'text-secondary' : 'text-white'
              }`}>
                {stat.value}
              </h4>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold font-mono">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      
        {/* Competencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {about.competencies?.map((comp: any, index: number) => {
              const Icon = iconMap[comp.icon] || Brain;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  className="bg-surface/30 p-6 rounded-lg border border-white/5 hover:border-accent/50 transition-all hover:-translate-y-1 group text-left h-full"
                >
                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                      <Icon className="text-accent" size={26} strokeWidth={1.7} />
                    </div>
                    <h4 className="text-base font-bold mb-3 text-white font-mono uppercase tracking-wide leading-snug">{comp.title}</h4>
                    <p className="text-sm text-gray-400 leading-6">{comp.description}</p>
                </motion.div>
              );
            })}
        </div>
      </div>
    </Section>
  );
};

export default About;
