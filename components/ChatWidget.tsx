
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithGemini } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import { TRANSLATIONS } from '../data';

interface ChatWidgetProps {
  lang: Language;
}

// Typewriter Component for AI Text
const TypewriterText: React.FC<{ text: string; onComplete?: () => void }> = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayedText('');
    indexRef.current = 0;

    const intervalId = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayedText((prev) => prev + text.charAt(indexRef.current));
        indexRef.current++;
      } else {
        clearInterval(intervalId);
        onComplete?.();
      }
    }, 20); // Typing speed

    return () => clearInterval(intervalId);
  }, [text, onComplete]);

  return <span>{displayedText}</span>;
};

export const ChatWidget: React.FC<ChatWidgetProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  // Initialize Chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { id: 'init', role: 'model', text: t.chat.initial }
      ]);
    }
    if (isOpen) {
        setShowPromo(false);
    }
  }, [isOpen, lang, t.chat.initial, messages.length]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const responseText = await chatWithGemini(input);
      const aiMsg: ChatMessage = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: responseText || "Connection interrupted." 
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
        console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
        
      {/* Bouncing Promo Bubble */}
      <AnimatePresence>
        {!isOpen && showPromo && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-4 mr-2 relative"
          >
            <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                <Sparkles className="w-3 h-3 text-yellow-300" />
                <span>Ask AI about me!</span>
                <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-cyan-600 rotate-45"></div>
            </motion.div>
            
            <button 
                onClick={() => setShowPromo(false)}
                className="absolute -top-2 -right-2 bg-neutral-800 text-neutral-400 rounded-full p-0.5 hover:text-white"
            >
                <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[340px] sm:w-[400px] h-[550px] bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-violet-900/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/5 flex justify-between items-center relative overflow-hidden">
               {/* Abstract Glow */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 blur-[40px] rounded-full pointer-events-none" />
               
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center shadow-inner border border-white/20">
                    <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm tracking-wide">Mikeyas AI</h3>
                  <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      <p className="text-[10px] font-mono text-cyan-400 uppercase">Online</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full relative z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
              {messages.map((msg, idx) => {
                 const isLast = idx === messages.length - 1;
                 return (
                    <motion.div 
                        key={msg.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                    <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        {/* Avatar Icons */}
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            msg.role === 'user' ? 'bg-neutral-700' : 'bg-violet-900/50 border border-violet-500/30'
                        }`}>
                            {msg.role === 'user' ? <User className="w-3 h-3 text-neutral-300" /> : <Bot className="w-3 h-3 text-violet-300" />}
                        </div>

                        {/* Bubble */}
                        <div className={`p-3.5 rounded-2xl text-sm leading-relaxed relative group ${
                            msg.role === 'user' 
                            ? 'bg-gradient-to-br from-neutral-800 to-neutral-900 text-white border border-white/10 rounded-br-none' 
                            : 'bg-violet-500/10 text-violet-100 border border-violet-500/20 rounded-bl-none shadow-[0_0_15px_-5px_rgba(139,92,246,0.1)]'
                        }`}>
                            {msg.role === 'model' && isLast && !isTyping ? (
                                <TypewriterText text={msg.text} />
                            ) : (
                                msg.text
                            )}
                        </div>
                    </div>
                    </motion.div>
                 )
              })}
              
              {isTyping && (
                <div className="flex justify-start">
                   <div className="flex items-end gap-2">
                       <div className="w-6 h-6 rounded-full bg-violet-900/50 border border-violet-500/30 flex items-center justify-center">
                            <Bot className="w-3 h-3 text-violet-300" />
                        </div>
                        <div className="bg-violet-500/10 p-4 rounded-2xl rounded-bl-none border border-violet-500/20 flex gap-1 items-center h-10">
                            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-black/40 border-t border-white/10 backdrop-blur-md">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t.chat.placeholder}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all placeholder:text-neutral-600 font-light"
                />
                <button 
                  onClick={handleSend}
                  disabled={isTyping || !input.trim()}
                  className="absolute right-1.5 top-1.5 p-1.5 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="text-center mt-2">
                 <span className="text-[10px] text-neutral-600 flex items-center justify-center gap-1">
                    Powered by <Sparkles className="w-2 h-2 text-violet-500" /> Gemini 2.5 Flash
                 </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative p-4 rounded-full shadow-2xl transition-all duration-300 z-50 group ${
            isOpen 
            ? 'bg-neutral-800 text-white rotate-90' 
            : 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white'
        }`}
      >
        {/* Glow Ring */}
        {!isOpen && (
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 blur opacity-50 group-hover:opacity-80 group-hover:blur-md transition-all duration-500 animate-pulse"></div>
        )}
        
        {isOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
      </motion.button>
    </div>
  );
};
