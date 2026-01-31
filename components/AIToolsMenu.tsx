import React from 'react';
import { SEARCH_PROVIDERS } from '../constants';

interface AIToolsMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIToolsMenu: React.FC<AIToolsMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const aiTools = SEARCH_PROVIDERS.filter(p => p.mode === 'ai');

  return (
    <>
      <div className="fixed inset-0 z-20" onClick={onClose} />
      <div 
        className="absolute bottom-24 left-8 z-30 w-72 bg-[#FDF0F8]/90 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-white/50 animate-[fadeIn_0.2s_ease-out]"
      >
         <h3 className="text-xs font-bold text-fuchsia-900/50 uppercase tracking-wider mb-3 px-2">AI Assistants</h3>
         <div className="flex flex-col gap-1">
            {aiTools.map(tool => (
                <a 
                    key={tool.id}
                    href={tool.urlTemplate.split('?')[0]} 
                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/80 transition-all group"
                >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-fuchsia-600 shadow-sm group-hover:scale-110 transition-transform">
                        {tool.icon}
                    </div>
                    <span className="text-gray-800 font-medium">{tool.name}</span>
                    <svg className="w-4 h-4 ml-auto text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            ))}
         </div>
      </div>
    </>
  );
};

export default AIToolsMenu;