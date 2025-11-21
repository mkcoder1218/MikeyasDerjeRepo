
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Layers, Sparkles, Code2, Cpu, Zap, Filter } from 'lucide-react';
import { PROJECTS } from '../data';
import { Language } from '../types';
import { SpotlightCard } from '../components/SpotlightCard';

const CATEGORIES = ['All', 'Fullstack', 'Frontend', 'AI'];

export const Projects: React.FC<{ lang: Language }> = ({ lang }) => {
  const [filter, setFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter || (filter === 'Fullstack' && p.category === 'Fullstack'));

  return (
    <div className="py-10 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 relative z-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-cyan-400 mb-4 font-mono text-sm"
          >
            <Code2 className="w-4 h-4" />
            <span>/WORK_V3.0</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase"
          >
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-500">Works</span>
          </motion.h1>
        </div>

        {/* Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md overflow-x-auto max-w-full"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                filter === cat ? 'text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {filter === cat && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode='popLayout'>
          {filteredProjects.map((project, index) => {
            // Featured Logic: First item in 'All' view is featured (large)
            const isFeatured = filter === 'All' && index === 0;
            
            return (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`${isFeatured ? 'md:col-span-2 lg:col-span-2 row-span-2' : 'col-span-1'}`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <SpotlightCard 
                  className="h-full group bg-[#0a0a0a] border-white/10 hover:border-white/20 transition-colors duration-500 overflow-hidden flex flex-col"
                  spotlightColor={isFeatured ? "rgba(139, 92, 246, 0.15)" : "rgba(6, 182, 212, 0.15)"}
                >
                  {/* Image Container */}
                  <div className={`relative overflow-hidden ${isFeatured ? 'h-[400px]' : 'h-[240px]'} w-full border-b border-white/5`}>
                    <div className="absolute inset-0 bg-neutral-900 z-0" />
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                    
                    {/* Cyber Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,20,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />
                    
                    {/* Floating Category Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 rounded-md bg-black/50 backdrop-blur border border-white/10 text-xs font-mono text-cyan-400 flex items-center gap-2 shadow-xl">
                        {project.category === 'AI' ? <Cpu className="w-3 h-3" /> : <Layers className="w-3 h-3" />}
                        {project.category.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className={`font-bold text-white group-hover:text-cyan-300 transition-colors ${isFeatured ? 'text-3xl' : 'text-xl'}`}>
                        {lang === 'en' ? project.title : project.titleAm}
                      </h3>
                      <motion.div 
                        className="text-neutral-500 group-hover:text-white transition-colors"
                        whileHover={{ rotate: 45 }}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.div>
                    </div>

                    <p className={`text-neutral-400 font-light leading-relaxed mb-6 ${isFeatured ? 'text-lg max-w-xl' : 'text-sm line-clamp-3'}`}>
                      {lang === 'en' ? project.description : project.descriptionAm}
                    </p>

                    <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-neutral-300 border border-white/5 group-hover:border-violet-500/30 group-hover:bg-violet-500/10 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Decoration Lines */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </SpotlightCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
