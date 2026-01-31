import React, { useState } from 'react';
import { ThemeConfig, ThemeType } from '../types';
import { Icons } from '../constants';

interface SettingsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeConfig;
  onUpdateTheme: (theme: ThemeConfig) => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ isOpen, onClose, currentTheme, onUpdateTheme }) => {
  const [localTheme, setLocalTheme] = useState<ThemeConfig>(currentTheme);

  // Sync when opening
  React.useEffect(() => {
    if (isOpen) setLocalTheme(currentTheme);
  }, [isOpen, currentTheme]);

  // Real-time update wrapper
  const update = (newTheme: ThemeConfig) => {
      setLocalTheme(newTheme);
      onUpdateTheme(newTheme); // Live preview
  };

  // Handlers
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update({ ...localTheme, userName: e.target.value });
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update({ ...localTheme, userProfilePicUrl: e.target.value });
  };

  const handleClockTypeChange = (type: 'analog' | 'digital' | 'slick') => {
      update({ ...localTheme, clock: { ...localTheme.clock, type } });
  }

  const handleClockToggle = (field: 'showNumbers' | 'use24Hour') => {
      update({ ...localTheme, clock: { ...localTheme.clock, [field]: !localTheme.clock[field] } });
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      update({ ...localTheme, type: ThemeType.COLOR, color: e.target.value });
  }

  return (
    <>
        {/* Backdrop */}
        <div 
            className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
            onClick={onClose}
        />

        {/* Sidebar */}
        <div className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Icons.Settings /> Settings
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                    <Icons.Close />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                {/* Profile Section */}
                <section>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Profile</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                            <input 
                                type="text" 
                                value={localTheme.userName}
                                onChange={handleNameChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fuchsia-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
                            <input 
                                type="text" 
                                value={localTheme.userProfilePicUrl || ''}
                                onChange={handleProfilePicChange}
                                placeholder="https://..."
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fuchsia-500 outline-none text-sm"
                            />
                        </div>
                    </div>
                </section>

                <hr className="border-gray-100" />

                {/* Clock Section */}
                <section>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Clock Style</h3>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        {['analog', 'digital', 'slick'].map((t) => (
                            <button
                                key={t}
                                onClick={() => handleClockTypeChange(t as any)}
                                className={`py-2 rounded-lg text-sm font-medium capitalize border transition-all ${
                                    localTheme.clock.type === t 
                                    ? 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700' 
                                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    
                    {localTheme.clock.type === 'analog' && (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <span className="text-sm font-medium text-gray-700">Show Numbers</span>
                            <input 
                                type="checkbox" 
                                checked={localTheme.clock.showNumbers} 
                                onChange={() => handleClockToggle('showNumbers')}
                                className="w-5 h-5 text-fuchsia-600 rounded focus:ring-fuchsia-500"
                            />
                        </div>
                    )}

                     {localTheme.clock.type === 'digital' && (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <span className="text-sm font-medium text-gray-700">24 Hour Format</span>
                            <input 
                                type="checkbox" 
                                checked={localTheme.clock.use24Hour} 
                                onChange={() => handleClockToggle('use24Hour')}
                                className="w-5 h-5 text-fuchsia-600 rounded focus:ring-fuchsia-500"
                            />
                        </div>
                    )}
                </section>

                <hr className="border-gray-100" />

                {/* Appearance */}
                <section>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Appearance</h3>
                    <div className="space-y-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                            <div className="flex gap-3">
                                <input 
                                    type="color" 
                                    value={localTheme.color} 
                                    onChange={handleColorChange} 
                                    className="h-10 w-10 rounded-lg cursor-pointer border-none"
                                />
                                <input 
                                    type="text" 
                                    value={localTheme.color} 
                                    onChange={handleColorChange} 
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl uppercase font-mono text-sm"
                                />
                            </div>
                         </div>
                    </div>
                </section>
                
                {/* Shortcuts */}
                 <section>
                    <div className="flex items-center justify-between">
                         <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Social Dock</h3>
                         <input 
                            type="checkbox" 
                            checked={localTheme.dockEnabled}
                            onChange={() => update({...localTheme, dockEnabled: !localTheme.dockEnabled})}
                            className="w-5 h-5 accent-fuchsia-600"
                         />
                    </div>
                 </section>

            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <button 
                    onClick={onClose}
                    className="w-full py-3 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-xl font-bold shadow-lg shadow-fuchsia-200 transition-all active:scale-95"
                >
                    Done
                </button>
            </div>

        </div>
    </>
  );
};

export default SettingsSidebar;