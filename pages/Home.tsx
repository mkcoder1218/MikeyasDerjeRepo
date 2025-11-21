
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Database, Cpu, Terminal, LayoutTemplate, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { SpotlightCard } from '../components/SpotlightCard';
import { Link } from 'react-router-dom';
import { TRANSLATIONS, SKILLS, EXPERIENCE } from '../data';
import { Language } from '../types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 50, damping: 20 }
  }
};

export const Home: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = TRANSLATIONS[lang].hero;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col gap-40 pb-20"
    >
      {/* Hero Section */}
      <motion.section variants={itemVariants} className="pt-20 md:pt-32 max-w-5xl relative">
        {/* Floating Badge */}
        <div className="flex items-center gap-3 mb-8">
           <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
           <span className="text-sm font-mono font-medium text-green-400 tracking-wide uppercase border border-green-500/20 bg-green-500/5 px-3 py-1 rounded-full shadow-[0_0_15px_-3px_rgba(74,222,128,0.3)]">
              {t.status}
           </span>
        </div>
        
        {/* Reduced Font Size Here */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white mb-8 leading-[1.1] relative z-10">
          {t.greeting} <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-white animate-gradient-x">
             {t.title}
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-400 mb-12 max-w-2xl leading-relaxed font-light">
          {t.subtitle}
        </p>
        
        <div className="flex flex-row gap-5">
          <Link to="/projects">
            <Button variant="primary">
              {t.cta} <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/about">
              <Button variant="secondary">
                  {TRANSLATIONS[lang].nav.about}
              </Button>
          </Link>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section variants={itemVariants}>
        <div className="flex items-end justify-between mb-10 px-1">
          <h2 className="text-sm font-mono text-violet-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {lang === 'en' ? 'Technical Arsenal' : 'ቴክኒካዊ ክህሎቶች'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS.map((category, idx) => (
            <SpotlightCard 
              key={idx}
              className="p-10 group bg-neutral-900/40 border-white/5"
              spotlightColor={
                idx === 0 ? "rgba(6, 182, 212, 0.2)" : // Cyan
                idx === 1 ? "rgba(139, 92, 246, 0.2)" : // Violet
                idx === 2 ? "rgba(236, 72, 153, 0.2)" : // Pink
                "rgba(234, 179, 8, 0.2)" // Yellow
              }
            >
              <div className="flex flex-col h-full relative z-10">
                <div className="flex items-center justify-between mb-8">
                   <div className={`p-4 rounded-2xl bg-gradient-to-br border border-white/5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3
                    ${idx === 0 ? 'from-cyan-500/20 to-blue-500/10 text-cyan-400' : 
                      idx === 1 ? 'from-violet-500/20 to-fuchsia-500/10 text-violet-400' : 
                      idx === 2 ? 'from-pink-500/20 to-rose-500/10 text-pink-400' : 
                      'from-amber-500/20 to-orange-500/10 text-amber-400'}`}>
                     {idx === 0 ? <LayoutTemplate className="w-8 h-8" /> : 
                      idx === 1 ? <Database className="w-8 h-8" /> : 
                      idx === 2 ? <Cpu className="w-8 h-8" /> : 
                      <Terminal className="w-8 h-8" />}
                   </div>
                   <span className="text-neutral-700 group-hover:text-white/50 transition-colors text-4xl font-bold font-mono opacity-50">0{idx + 1}</span>
                </div>
                
                <h3 className="font-bold text-2xl text-white mb-6 tracking-tight">
                  {lang === 'en' ? category.title : category.titleAm}
                </h3>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {category.skills.map(skill => (
                    <span key={skill} className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 text-neutral-300 border border-white/5 group-hover:border-white/10 group-hover:bg-white/10 transition-all">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section variants={itemVariants}>
        <h2 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-12 flex items-center gap-2 px-1">
            <span className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_cyan]"></span>
            {lang === 'en' ? 'Career Trajectory' : 'የስራ ልምድ'}
        </h2>
        <div className="space-y-6">
          {EXPERIENCE.map((job, i) => (
            <div 
                key={job.id} 
                className="p-8 md:p-10 bg-neutral-900/30 hover:bg-neutral-900/60 border border-white/5 hover:border-violet-500/30 rounded-3xl transition-all duration-300 group relative overflow-hidden backdrop-blur-sm"
            >
              {/* Hover Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-violet-600/20 transition-all" />

              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 relative z-10">
                <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-violet-300 transition-colors mb-1">
                    {lang === 'en' ? job.role : job.roleAm}
                    </h3>
                    <p className="text-cyan-400 font-medium flex items-center gap-2 text-sm">
                        {job.company}
                    </p>
                </div>
                <span className="text-xs font-mono font-bold text-neutral-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    {lang === 'en' ? job.period : job.periodAm}
                </span>
              </div>
              
              <ul className="grid md:grid-cols-2 gap-4 relative z-10">
                {(lang === 'en' ? job.description : job.descriptionAm).map((desc, i) => (
                  <li key={i} className="text-neutral-400 text-sm leading-relaxed flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-neutral-700 rounded-full group-hover:bg-violet-500 transition-colors" />
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};
