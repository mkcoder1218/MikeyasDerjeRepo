import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { About } from "./pages/About";
import { ChatWidget } from "./components/ChatWidget";
import { Language } from "./types";

const AnimatedRoutes: React.FC<{ lang: Language }> = ({ lang }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home lang={lang} />} />
        <Route path="/projects" element={<Projects lang={lang} />} />
        <Route path="/about" element={<About lang={lang} />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <Router>
      <Layout lang={lang} setLang={setLang}>
        <AnimatedRoutes lang={lang} />
      </Layout>
      <ChatWidget lang={lang} />
    </Router>
  );
};

export default App;
