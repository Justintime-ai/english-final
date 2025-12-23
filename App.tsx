
import React, { useState, useEffect } from 'react';
import { AppConfig, CardData } from './types';
import AnimatedCard from './components/AnimatedCard';
import EditorPanel from './components/EditorPanel';
import { motion, useScroll, useSpring } from 'framer-motion';

const INITIAL_CONFIG: AppConfig = {
  backgroundType: 'image',
  backgroundValue: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop',
};

const INITIAL_CARDS: CardData[] = [
  {
    id: '1',
    type: 'text',
    title: 'Welcome to Dynamic Design',
    content: 'This website is built with layered, animated components. Scroll down to see the magic. You can customize every aspect using the settings icon in the bottom right.',
    animationType: 'center',
    bgColor: '#ffffff',
    opacity: 0.3,
    textColor: 'white',
  },
  {
    id: '2',
    type: 'image',
    title: 'Visual Excellence',
    content: 'Insert high-quality images to create a stunning visual experience. This card slides in from the left.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    animationType: 'left',
    bgColor: '#1e293b',
    opacity: 0.6,
    textColor: 'white',
  },
  {
    id: '3',
    type: 'text',
    title: 'Customizable Layers',
    content: 'Change background colors, transparency levels, and animation directions in real-time. Each layer feels distinct and premium.',
    animationType: 'right',
    bgColor: '#6366f1',
    opacity: 0.4,
    textColor: 'white',
  },
  {
    id: '4',
    type: 'image',
    title: 'Geometric Animations',
    content: 'Cards can scale from their geometric center or slide from the sides to create a dynamic flow as the user scrolls.',
    imageUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1974&auto=format&fit=crop',
    animationType: 'center',
    bgColor: '#ffffff',
    opacity: 0.2,
    textColor: 'white',
  }
];

const App: React.FC = () => {
  const [config, setConfig] = useState<AppConfig>(INITIAL_CONFIG);
  const [cards, setCards] = useState<CardData[]>(INITIAL_CARDS);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: -1,
    transition: 'all 0.5s ease-in-out',
  };

  if (config.backgroundType === 'color') {
    backgroundStyle.backgroundColor = config.backgroundValue;
  } else {
    backgroundStyle.backgroundImage = `url(${config.backgroundValue})`;
    backgroundStyle.backgroundSize = 'cover';
    backgroundStyle.backgroundPosition = 'center';
  }

  return (
    <div className="min-h-screen">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-[100] origin-left" 
        style={{ scaleX }}
      />

      {/* Dynamic Background */}
      <div style={backgroundStyle} />
      
      {/* Overlay to ensure readability if bg is too bright */}
      <div className="fixed inset-0 z-[-1] bg-black/20" />

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-64 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {cards.map((card) => (
            <AnimatedCard key={card.id} data={card} />
          ))}

          {cards.length === 0 && (
            <div className="text-center text-white py-20 bg-white/10 backdrop-blur-md rounded-3xl">
              <p className="text-xl">No cards yet. Click the settings icon to add one!</p>
            </div>
          )}
        </div>
      </main>

      {/* Editor Panel Component */}
      <EditorPanel 
        config={config} 
        setConfig={setConfig} 
        cards={cards} 
        setCards={setCards} 
      />

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-8 text-center text-white/50 text-sm z-0">
        <p>&copy; 2024 Layered Experience. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
