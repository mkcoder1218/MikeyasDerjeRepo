import React from 'react';
import { motion } from 'framer-motion';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';
import { Download, Mail } from 'lucide-react';

export const About: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = TRANSLATIONS[lang].about;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="py-10 max-w-3xl"
    >
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-bold text-white mb-10"
      >
        {t.title}
      </motion.h1>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-8 text-lg text-neutral-400 leading-relaxed font-light"
      >
        <p>{t.p1}</p>
        <p>{t.p2}</p>
        
        <div className="p-6 border-l-2 border-white bg-neutral-900/30 italic text-neutral-300 my-8">
          "{t.mission}"
        </div>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16"
      >
          <div className="p-6 border border-neutral-800 rounded bg-neutral-900/30 hover:bg-neutral-900 transition-colors">
             <span className="block text-4xl font-bold text-white mb-1">3+</span>
             <span className="text-xs text-neutral-500 uppercase tracking-widest">Years Experience</span>
          </div>
          <div className="p-6 border border-neutral-800 rounded bg-neutral-900/30 hover:bg-neutral-900 transition-colors">
             <span className="block text-4xl font-bold text-white mb-1">15+</span>
             <span className="text-xs text-neutral-500 uppercase tracking-widest">Projects Delivered</span>
          </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 pt-12 border-t border-neutral-900 flex flex-wrap gap-4"
      >
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-md text-sm font-medium hover:bg-neutral-200 transition-colors">
          <Mail className="w-4 h-4" /> Get in Touch
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-neutral-800 text-white rounded-md text-sm font-medium hover:bg-neutral-900 transition-colors">
          <Download className="w-4 h-4" /> Download Resume
        </button>
      </motion.div>
    </motion.div>
  );
};