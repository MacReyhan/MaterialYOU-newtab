import React, { useEffect, useState } from 'react';
import { ThemeConfig } from '../types';

interface ClockProps {
  theme: ThemeConfig;
}

const Clock: React.FC<ClockProps> = ({ theme }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const { type, showNumbers, use24Hour } = theme.clock;

  // --- ANALOG CLOCK ---
  if (type === 'analog') {
      const minutes = time.getMinutes();
      const hours = time.getHours();
      const minuteDeg = (minutes / 60) * 360;
      const hourDeg = ((hours % 12 + minutes / 60) / 12) * 360;

      return (
        <div className="relative w-80 h-80 md:w-[26rem] md:h-[26rem] flex items-center justify-center">
           {/* Background Shape */}
           <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full drop-shadow-sm text-[#FDF0F8] opacity-90">
             <path fill="currentColor" d="M100,15 C115,15 125,30 140,30 C155,30 170,20 180,35 C190,50 175,65 180,80 C185,95 200,100 195,115 C190,130 175,135 170,150 C165,165 175,180 160,185 C145,190 135,175 120,175 C105,175 95,190 80,185 C65,180 70,165 60,150 C50,135 30,135 25,120 C20,105 35,90 30,75 C25,60 10,55 20,40 C30,25 45,35 60,30 C75,25 85,15 100,15 Z" />
           </svg>

           {/* Numbers (Optional) */}
           {showNumbers && (
             <div className="absolute inset-0">
               {[...Array(12)].map((_, i) => {
                 const num = i + 1;
                 const angle = (i * 30 + 30) * (Math.PI / 180) - (Math.PI / 2); // Correct offset for 12 at top
                 const radius = 38; // Percentage
                 const x = 50 + radius * Math.cos(angle); // Swapped cos/sin for correct rotation starting from 3 if 0, but adjusted above
                 // Actually easier: 12 is at -90deg. 1 is at -60deg.
                 const displayAngle = (num * 30 - 90) * (Math.PI / 180);
                 const left = 50 + 36 * Math.cos(displayAngle);
                 const top = 50 + 36 * Math.sin(displayAngle);
                 
                 return (
                   <div 
                    key={num} 
                    className="absolute text-2xl font-medium text-fuchsia-900/40 w-8 h-8 flex items-center justify-center"
                    style={{ left: `${left}%`, top: `${top}%`, transform: 'translate(-50%, -50%)' }}
                   >
                     {num}
                   </div>
                 );
               })}
             </div>
           )}

           {/* Hands */}
           <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-8 drop-shadow-md">
                <line x1="50" y1="50" x2="50" y2="28" stroke="#A050A0" strokeWidth="8" strokeLinecap="round" transform={`rotate(${hourDeg} 50 50)`} />
                <line x1="50" y1="50" x2="50" y2="18" stroke="#A050A0" strokeWidth="6" strokeLinecap="round" transform={`rotate(${minuteDeg} 50 50)`} opacity="0.9" />
                <circle cx="85" cy="50" r="4" fill="#C060C0" />
           </svg>
        </div>
      );
  }

  // --- DIGITAL CLOCK ---
  if (type === 'digital') {
      const hours = use24Hour ? time.getHours() : (time.getHours() % 12 || 12);
      const minutes = time.getMinutes().toString().padStart(2, '0');
      const ampm = time.getHours() >= 12 ? 'PM' : 'AM';

      return (
          <div className="flex flex-col items-center">
              <div className="text-[10rem] leading-none font-bold text-fuchsia-900/80 tracking-tighter" style={{ textShadow: '4px 4px 0px rgba(255,255,255,0.4)' }}>
                  {hours}:{minutes}
              </div>
              {!use24Hour && <div className="text-3xl font-light text-fuchsia-800 tracking-widest mt-[-1rem]">{ampm}</div>}
          </div>
      );
  }

  // --- SLICK (TEXT) CLOCK ---
  if (type === 'slick') {
      const hours = time.getHours();
      const minutes = time.getMinutes();
      
      const numToWords = (n: number) => {
          const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
          const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty'];
          if (n < 20) return ones[n];
          return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
      };

      const hourWord = numToWords(hours % 12 || 12);
      const minWord = minutes === 0 ? "O'Clock" : numToWords(minutes);

      return (
          <div className="flex flex-col items-center md:items-start space-y-2">
              <span className="text-6xl md:text-8xl font-black text-white drop-shadow-lg tracking-tight uppercase" style={{ WebkitTextStroke: '2px #86198f' }}>
                  It is
              </span>
              <span className="text-6xl md:text-8xl font-black text-fuchsia-800 drop-shadow-sm tracking-tight uppercase">
                  {hourWord}
              </span>
              <span className="text-6xl md:text-8xl font-black text-fuchsia-600/60 drop-shadow-sm tracking-tight uppercase">
                  {minWord}
              </span>
          </div>
      );
  }

  return null;
};

export default Clock;