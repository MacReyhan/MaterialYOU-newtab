import React, { useState, useEffect } from 'react';
import { ThemeType } from './types';
import { DEFAULT_THEME, SOCIAL_APPS } from './constants';
import { getTheme, saveTheme, getSavedEngineId } from './services/storage';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SettingsSidebar from './components/SettingsSidebar';
import Clock from './components/Clock';
import WeatherWidget from './components/WeatherWidget';
import AIToolsMenu from './components/AIToolsMenu';
import { Icons } from './constants';

const App: React.FC = () => {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAIToolsOpen, setIsAIToolsOpen] = useState(false);
  const [engineId] = useState(getSavedEngineId());
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const saved = getTheme();
    setTheme(saved);
    setIsLoaded(true);
    const interval = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateTheme = (newTheme: typeof theme) => {
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  const containerStyle: React.CSSProperties = theme.type === ThemeType.IMAGE 
    ? {
        backgroundImage: `url(${theme.backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : {
        backgroundColor: theme.color,
      };

  const formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  if (!isLoaded) return null;

  return (
    <div 
        className="min-h-screen w-full relative overflow-hidden transition-all duration-500 ease-in-out flex flex-col font-[Google Sans]"
        style={containerStyle}
    >
        {theme.type === ThemeType.IMAGE && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-0" />
        )}

        <Header 
            theme={theme} 
            onOpenSettings={() => setIsSettingsOpen(true)} 
            bgColor={theme.type === ThemeType.COLOR ? theme.color : '#ffffff'}
        />

        {/* AI Tools FAB */}
        <div className="absolute bottom-8 left-8 z-30">
            <button 
                onClick={() => setIsAIToolsOpen(!isAIToolsOpen)}
                className={`px-6 py-3 rounded-full flex items-center gap-3 shadow-lg transition-all font-bold tracking-wide transform hover:scale-105 active:scale-95 ${
                    isAIToolsOpen 
                    ? 'bg-fuchsia-100 text-fuchsia-900 ring-2 ring-fuchsia-300' 
                    : 'bg-white/60 backdrop-blur-md text-fuchsia-900 hover:bg-white/80'
                }`}
            >
                <Icons.Sparkles />
                AI Tools
            </button>
            <AIToolsMenu isOpen={isAIToolsOpen} onClose={() => setIsAIToolsOpen(false)} />
        </div>

        <main className="flex-1 relative z-10 flex items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Left: Clock */}
                <div className="flex flex-col items-center justify-center gap-4">
                    <Clock theme={theme} />
                    <div className={`text-xl font-medium tracking-widest uppercase opacity-60 ${theme.type === ThemeType.IMAGE ? 'text-white' : 'text-gray-700'}`}>
                        {formattedDate}
                    </div>
                </div>

                {/* Right: Tools */}
                <div className="flex flex-col items-center lg:items-start gap-12 w-full max-w-2xl mx-auto lg:mx-0">
                    <div className="w-full flex justify-center lg:justify-start">
                        <WeatherWidget config={theme.weather} themeType={theme.type} />
                    </div>
                    <div className="w-full">
                        <SearchBar initialEngineId={engineId} />
                    </div>
                </div>

            </div>
        </main>
        
        {/* Dock - Improved Styling for Visibility */}
        {theme.dockEnabled && (
            <div className="relative z-20 pb-10 flex justify-center animate-[slideUp_0.5s_ease-out]">
                <div className="flex gap-6 px-10 py-5 bg-[#F3E8F5]/80 backdrop-blur-2xl rounded-[3rem] shadow-xl border border-white/40">
                    {SOCIAL_APPS.map((app) => (
                        <a 
                            key={app.name} 
                            href={app.url}
                            className="w-14 h-14 rounded-full bg-white/40 hover:bg-white text-gray-700 hover:text-fuchsia-700 flex items-center justify-center shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group relative"
                            title={app.name}
                        >
                            <div className="transform transition-transform duration-300 group-hover:scale-110">
                                {app.iconComponent}
                            </div>
                            {/* Tooltip */}
                            <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all text-xs font-bold text-gray-600 bg-white/90 px-3 py-1 rounded-full shadow-sm pointer-events-none transform translate-y-2 group-hover:translate-y-0">
                                {app.name}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        )}

        <SettingsSidebar 
            isOpen={isSettingsOpen} 
            onClose={() => setIsSettingsOpen(false)} 
            currentTheme={theme}
            onUpdateTheme={handleUpdateTheme}
        />
    </div>
  );
};

export default App;