import React, { useRef, useState, useEffect } from 'react';
import { Icons } from '../constants';
import AppsMenu from './AppsMenu';
import { ThemeConfig } from '../types';

interface HeaderProps {
  theme: ThemeConfig;
  onOpenSettings: () => void;
  bgColor: string;
}

const Header: React.FC<HeaderProps> = ({ theme, onOpenSettings, bgColor }) => {
  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const appsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
        if (appsRef.current && !appsRef.current.contains(e.target as Node)) {
            setIsAppsOpen(false);
        }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-30">
      {/* Left: User Profile (Clickable) */}
      <button 
        onClick={onOpenSettings}
        className="flex items-center gap-4 group text-left rounded-full hover:bg-black/5 p-2 pr-4 transition-all"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm border-2 border-white/40 group-hover:border-fuchsia-400 transition-colors">
            {theme.userProfilePicUrl ? (
                <img src={theme.userProfilePicUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-fuchsia-400 to-indigo-400 flex items-center justify-center text-white font-bold text-xl">
                    {theme.userName.charAt(0).toUpperCase()}
                </div>
            )}
            
             {/* Edit Overlay */}
             <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full w-12 h-12 ml-2 mt-2 pointer-events-none">
                 <Icons.Edit /> 
             </div>
        </div>
        
        <div className="flex flex-col">
            <span className={`text-sm font-medium opacity-70 ${theme.type === 'image' ? 'text-white' : 'text-gray-600'}`}>Good Day,</span>
            <span className={`text-lg font-bold ${theme.type === 'image' ? 'text-white' : 'text-gray-800'}`}>
                {theme.userName}
            </span>
        </div>
      </button>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
         {/* Apps Menu Trigger */}
        <div className="relative" ref={appsRef}>
            <button 
                onClick={() => setIsAppsOpen(!isAppsOpen)}
                className={`p-3 rounded-full transition-all duration-200 ${
                    theme.type === 'image' ? 'bg-black/20 hover:bg-black/40 text-white' : 'hover:bg-black/5 text-gray-700'
                } ${isAppsOpen ? 'bg-black/10' : ''}`}
            >
                <Icons.Apps />
            </button>
            <AppsMenu isOpen={isAppsOpen} onClose={() => setIsAppsOpen(false)} bgColor={bgColor} />
        </div>
        
         {/* Settings Button */}
        <button 
            onClick={onOpenSettings}
            className={`p-3 rounded-full transition-all duration-200 ${theme.type === 'image' ? 'bg-black/20 hover:bg-black/40 text-white' : 'hover:bg-black/5 text-gray-700'}`}
        >
            <Icons.Settings />
        </button>
      </div>
    </header>
  );
};

export default Header;