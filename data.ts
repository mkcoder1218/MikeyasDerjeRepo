
import { Project, Experience, SkillCategory } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Real Estate Map Platform',
    titleAm: 'የሪል እስቴት ካርታ መድረክ',
    description: 'A high-performance map-based real estate application handling thousands of listings. Features clustering, geometric search, and Redux state management.',
    descriptionAm: 'በሺዎች የሚቆጠሩ ቤቶችን የሚያስተናግድ የካርታ ላይ ሪል እስቴት መተግበሪያ።',
    techStack: ['Next.js', 'Google Maps API', 'Supercluster', 'Redux Toolkit', 'Algolia'],
    image: 'https://picsum.photos/800/450?grayscale',
    category: 'Fullstack'
  },
  {
    id: '2',
    title: 'Pro Betting Platform',
    titleAm: 'የውርርድ መድረክ',
    description: 'A professional betting platform built as a portfolio project and later adopted for commercial use. Features real-time odds updates and secure transactions.',
    descriptionAm: 'ለሙያዊ አገልግሎት የሚውል የውርርድ መድረክ።',
    techStack: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
    image: 'https://picsum.photos/800/451?grayscale',
    category: 'Fullstack'
  },
  {
    id: '3',
    title: 'Global Admin Dashboard',
    titleAm: 'አድሚን ዳሽቦርድ',
    description: 'Comprehensive admin panel with dynamic resizing modals, multi-language support, and complex data visualization.',
    descriptionAm: 'ሁለገብ የአስተዳደር ፓነል ከዳይናሚክ ሞዳሎች እና ባለብዙ ቋንቋ ድጋፍ ጋር።',
    techStack: ['React', 'TypeScript', 'Tailwind', 'Recharts'],
    image: 'https://picsum.photos/800/452?grayscale',
    category: 'Frontend'
  },
  {
    id: '4',
    title: 'AI Automation Scraper',
    titleAm: 'AI አውቶሜሽን',
    description: 'Python and Node.js based tools for automated data gathering and processing using LLMs for content extraction.',
    descriptionAm: 'ለራስ-ሰር መረጃ አሰባሰብ እና ለይቶ ማውጣት የተሰራ AI መሣሪያ።',
    techStack: ['Python', 'Node.js', 'Selenium', 'Gemini API'],
    image: 'https://picsum.photos/800/453?grayscale',
    category: 'AI'
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: '1',
    role: 'Senior Frontend Engineer',
    roleAm: 'ሲኒየር የፊት-ለፊት ኢንጂነር',
    company: 'Tech Startup (Addis Ababa)',
    period: '2023 - Present',
    periodAm: '2015 - አሁን',
    description: [
      'Leading the frontend migration to Next.js 14.',
      'Implemented AI-driven features reducing manual data entry by 40%.',
      'Mentoring junior developers.'
    ],
    descriptionAm: [
      'የፊት-ለፊት ልማትን ወደ Next.js 14 የመቀየር ስራ እየመራሁ ነው።',
      'AI በመጠቀም የመረጃ አገባብ ስራን በ40% ቀነስኩ።'
    ]
  },
  {
    id: '2',
    role: 'Full Stack Developer',
    roleAm: 'ፉል ስታክ ዴቢሎፐር',
    company: 'Freelance',
    period: '2021 - 2023',
    periodAm: '2013 - 2015',
    description: [
      'Built custom betting platforms for international clients.',
      'Developed real-estate solutions integrated with Google Maps.',
      'Self-taught deep dive into system architecture.'
    ],
    descriptionAm: [
      'ለአለም አቀፍ ደንበኞች የውርርድ መድረኮችን ገንብቻለሁ።',
      'ከGoogle Maps ጋር የተገናኙ የሪል እስቴት መፍትሄዎችን አዘጋጀሁ።'
    ]
  }
];

export const SKILLS: SkillCategory[] = [
  {
    title: 'Frontend',
    titleAm: 'ፊቴ-ለፊት (Frontend)',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux']
  },
  {
    title: 'Backend',
    titleAm: 'የኋላ ደንብ (Backend)',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Prisma', 'FastAPI']
  },
  {
    title: 'AI & Data',
    titleAm: 'AI እና ዳታ',
    skills: ['Gemini API', 'LangChain', 'Web Scraping', 'Pandas']
  },
  {
    title: 'DevOps',
    titleAm: 'ዴቭኦፕስ',
    skills: ['Docker', 'GitHub Actions', 'CI/CD', 'Vercel', 'Linux']
  }
];

export const TRANSLATIONS = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      chat: 'Ask AI'
    },
    hero: {
      greeting: "Hi, I'm Mikeyas.",
      title: 'Full Stack Engineer & AI Enthusiast',
      subtitle: 'Building scalable digital experiences with React, Next.js, and Artificial Intelligence.',
      cta: 'View Work',
      status: 'Available for Freelance 🟢'
    },
    about: {
      title: 'About Me',
      p1: 'I am a self-taught engineer with over 3 years of experience building complex systems. Education systems often fail to keep up with technology, so I took my learning into my own hands.',
      p2: 'My passion lies in combining clean architecture with advanced UI/UX. I specialize in large-scale applications like admin panels and real estate platforms. Currently, I am expanding my horizons into AI engineering and DevOps.',
      mission: 'Mission: To build world-class software solutions from Africa to the world.'
    },
    chat: {
      placeholder: 'Ask me about Mikeyas...',
      initial: "Hello! I am Mikeyas's AI assistant. I can answer questions about his projects, skills, or experience. I speak English and Amharic.",
      thinking: 'Thinking...'
    },
    footer: {
      rights: 'All rights reserved.'
    }
  },
  am: {
    nav: {
      home: 'መነሻ',
      about: 'ስለ እኔ',
      projects: 'ፕሮጀክቶች',
      contact: 'ያግኙኝ',
      chat: 'AI ጠይቅ'
    },
    hero: {
      greeting: "ሰላም፣ ሚኪያስ ነኝ።",
      title: 'ፉል ስታክ ኢንጂነር እና AI ባለሙያ',
      subtitle: 'በReact፣ Next.js እና Artificial Intelligence በመታገዝ ዘመናዊ የሆኑ ዲጂታል መፍትሄዎችን እገነባለሁ።',
      cta: 'ስራዎቼን ይመልከቱ',
      status: 'ለፍሪላንስ ስራ ዝግጁ 🟢'
    },
    about: {
      title: 'ስለ እኔ',
      p1: 'ውስብስብ ስርዓቶችን በመገንባት ከ3 ዓመታት በላይ ልምድ ያለኝ በራሴ የተማርኩ ኢንጂነር ነኝ።',
      p2: 'ፍላጎቴ ንጹህ የሆነ የኮድ አወቃቀርን ከዘመናዊ UI/UX ጋር ማዋሃድ ነው። እንደ አድሚን ፓነሎች እና የሪል እስቴት መድረኮች ባሉ ትላልቅ ፕሮጀክቶች ላይ ልዩ ክህሎት አለኝ።',
      mission: 'ራዕይ፡ ከኢትዮጵያ ለአለም አቀፍ ገበያ የሚሆኑ ሶፍትዌሮችን መገንባት።'
    },
    chat: {
      placeholder: 'ስለ ሚኪያስ ይጠይቁ...',
      initial: "ሰላም! እኔ የሚኪያስ AI ረዳት ነኝ። ስለ የእሱ ፕሮጀክቶች፣ ክህሎቶች ወይም ልምድ ጥያቄዎችን መመለስ እችላለሁ። አማርኛ እና እንግሊዝኛ እናገራለሁ።",
      thinking: 'እያሰበ ነው...'
    },
    footer: {
      rights: 'መብቱ በህግ የተጠበቀ ነው።'
    }
  }
};
