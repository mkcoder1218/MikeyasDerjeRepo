
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Github, Linkedin, Twitter, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  setLang: (l: Language) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, lang, setLang }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const t = TRANSLATIONS[lang].nav;

  const navLinks = [
    { path: '/', label: t.home },
    { path: '/about', label: t.about },
    { path: '/projects', label: t.projects },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-[#030014] text-neutral-200 font-sans selection:bg-violet-500 selection:text-white overflow-x-hidden relative">
      {/* COOL AURORA BACKGROUND */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
         {/* Top Left Purple/Blue Blob */}
         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob opacity-40"></div>
         
         {/* Top Right Cyan/Blue Blob */}
         <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 opacity-40"></div>
         
         {/* Bottom Center Blue Blob */}
         <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000 opacity-30"></div>
         
         {/* Noise Overlay */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150"></div>
         
         {/* Grid Overlay */}
         <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" 
          style={{ maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 100%)' }}
        ></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#030014]/50 backdrop-blur-md supports-[backdrop-filter]:bg-[#030014]/20">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl font-bold tracking-tighter text-white hover:text-violet-200 transition-colors flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-mono text-sm shadow-lg shadow-violet-500/20">
              M
            </div>
            <span>Mikeyas<span className="text-neutral-500">Derje</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className="relative py-2 px-1 group"
              >
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  isActive(link.path) ? 'text-white' : 'text-neutral-400 group-hover:text-violet-300'
                }`}>
                  {link.label}
                </span>
                {isActive(link.path) && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 to-cyan-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
            
            <div className="w-px h-6 bg-neutral-800 mx-2" />
            
            <button 
              onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
              className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-400 hover:text-white px-3 py-1.5 rounded-full border border-neutral-800 hover:border-violet-500/50 bg-neutral-900/50 hover:bg-violet-500/10 transition-all duration-300"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'en' ? 'AM' : 'EN'}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-neutral-200 z-50 p-2">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            className="fixed inset-0 z-40 bg-[#030014] pt-32 px-8 md:hidden flex flex-col gap-8"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500 tracking-tighter hover:to-violet-400 transition-all"
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 w-full my-4" />
            <button 
              onClick={() => {
                setLang(lang === 'en' ? 'am' : 'en');
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-4 text-xl text-neutral-400"
            >
              <Globe className="w-6 h-6 text-violet-500" />
              {lang === 'en' ? 'Switch to Amharic' : 'Switch to English'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <main className="flex-1 pt-32 w-full max-w-6xl mx-auto px-6 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 mt-32 relative z-10 bg-[#030014]/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-2">
             <p className="text-neutral-400 text-sm font-mono">
              © {new Date().getFullYear()} Mikeyas Derje.
            </p>
            <p className="text-xs text-neutral-600">Built with React, Next.js & Gemini AI</p>
          </div>
         
          <div className="flex gap-6">
            <a href="#" className="text-neutral-500 hover:text-violet-400 hover:scale-110 transition-all duration-300"><Github className="w-5 h-5" /></a>
            <a href="#" className="text-neutral-500 hover:text-blue-400 hover:scale-110 transition-all duration-300"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="text-neutral-500 hover:text-cyan-400 hover:scale-110 transition-all duration-300"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};
    