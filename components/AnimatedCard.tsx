
import React from 'react';
import { motion } from 'framer-motion';
import { CardData } from '../types';

interface AnimatedCardProps {
  data: CardData;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ data }) => {
  const getInitialAnimation = () => {
    switch (data.animationType) {
      case 'left':
        return { x: -150, opacity: 0 };
      case 'right':
        return { x: 150, opacity: 0 };
      case 'center':
        return { scale: 0.5, opacity: 0 };
      default:
        return { opacity: 0 };
    }
  };

  const getWhileInView = () => {
    switch (data.animationType) {
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 };
      case 'center':
        return { scale: 1, opacity: 1 };
      default:
        return { opacity: 1 };
    }
  };

  const cardStyle = {
    backgroundColor: `${data.bgColor}${Math.floor(data.opacity * 255).toString(16).padStart(2, '0')}`,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    color: data.textColor === 'white' ? '#fff' : '#000',
  };

  return (
    <motion.div
      initial={getInitialAnimation()}
      whileInView={getWhileInView()}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ 
        type: 'spring', 
        stiffness: 100, 
        damping: 20, 
        duration: 0.8 
      }}
      className="w-full max-w-4xl mx-auto mb-24 p-8 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden"
      style={cardStyle}
    >
      {data.type === 'text' ? (
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">{data.title || 'Untitled Card'}</h2>
          <p className="text-lg leading-relaxed opacity-90">{data.content || 'No content provided.'}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold tracking-tight">{data.title || 'Untitled Image Card'}</h2>
          <div className="rounded-xl overflow-hidden aspect-video relative shadow-inner">
             {data.imageUrl ? (
               <img 
                src={data.imageUrl} 
                alt={data.title} 
                className="w-full h-full object-cover"
               />
             ) : (
               <div className="w-full h-full bg-gray-200/50 flex items-center justify-center text-gray-500 italic">
                 No image URL provided
               </div>
             )}
          </div>
          {data.content && <p className="text-lg leading-relaxed opacity-90">{data.content}</p>}
        </div>
      )}
    </motion.div>
  );
};

export default AnimatedCard;
