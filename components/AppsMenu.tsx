import React from 'react';
import { GOOGLE_APPS } from '../constants';

interface AppsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  bgColor: string;
}

const AppsMenu: React.FC<AppsMenuProps> = ({ isOpen, onClose, bgColor }) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose} 
      />
      <div 
        className="absolute top-16 right-4 z-50 w-[340px] p-6 rounded-[2rem] shadow-2xl transition-all duration-200 transform origin-top-right animate-[fadeIn_0.2s_ease-out]"
        style={{ 
          backgroundColor: '#F3E8F5',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.5)'
        }}
      >
        <div className="grid grid-cols-3 gap-y-6 gap-x-2">
          {GOOGLE_APPS.map((app) => (
            <a 
              key={app.name} 
              href={app.url} 
              className="flex flex-col items-center justify-center gap-2 group p-2 rounded-xl hover:bg-white/40 transition-colors"
            >
              <div className="transform transition-transform duration-200 group-hover:scale-110">
                {app.iconComponent}
              </div>
              <span className="text-sm font-medium text-gray-700">{app.name}</span>
            </a>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-300/50 flex justify-center">
             <button className="text-sm text-fuchsia-700 font-medium hover:bg-fuchsia-50 px-4 py-2 rounded-full transition-colors">
                More from Google
             </button>
        </div>
      </div>
    </>
  );
};

export default AppsMenu;