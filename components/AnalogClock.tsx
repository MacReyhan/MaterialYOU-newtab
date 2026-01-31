import React, { useEffect, useState } from 'react';
import { ThemeConfig, ThemeType } from '../types';

interface AnalogClockProps {
  theme: ThemeConfig;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ theme }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = time.getMinutes();
  const hours = time.getHours();

  // Rotation angles
  // No second hand in the mockup
  const minuteDeg = ((minutes) / 60) * 360;
  const hourDeg = ((hours % 12 + minutes / 60) / 12) * 360;

  // Use a soft white/pastel for the face to match the image
  const shapeFill = 'rgba(255, 245, 255, 0.6)';
  
  // Hands colors from the image (Purple/Pink gradient style solid color)
  const handColor = '#A050A0'; 
  const minuteHandColor = '#A050A0'; 

  return (
    <div className="relative w-80 h-80 md:w-[26rem] md:h-[26rem] flex items-center justify-center">
       {/* Material You "Star/Scallop" Shape Background */}
       <svg 
         viewBox="0 0 200 200" 
         className="absolute inset-0 w-full h-full drop-shadow-sm"
         style={{ color: shapeFill }}
       >
         <path 
            fill="currentColor"
            d="M100,15 C115,15 125,30 140,30 C155,30 170,20 180,35 C190,50 175,65 180,80 C185,95 200,100 195,115 C190,130 175,135 170,150 C165,165 175,180 160,185 C145,190 135,175 120,175 C105,175 95,190 80,185 C65,180 70,165 60,150 C50,135 30,135 25,120 C20,105 35,90 30,75 C25,60 10,55 20,40 C30,25 45,35 60,30 C75,25 85,15 100,15 Z"
            transform="rotate(0 100 100)"
         />
       </svg>

       {/* Clock Hands */}
       <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-8 drop-shadow-md">
            {/* Hour Hand - Thick with rounded caps */}
            <line 
                x1="50" y1="50" x2="50" y2="28" 
                stroke={handColor} 
                strokeWidth="8" 
                strokeLinecap="round"
                transform={`rotate(${hourDeg} 50 50)`} 
            />

            {/* Minute Hand - Slightly Thinner/Longer */}
            <line 
                x1="50" y1="50" x2="50" y2="18" 
                stroke={minuteHandColor} 
                strokeWidth="6" 
                strokeLinecap="round"
                transform={`rotate(${minuteDeg} 50 50)`} 
                opacity="0.9"
            />
            
            {/* Decoration Dot from image (at 3 o'clock position on the edge roughly) */}
            <circle cx="85" cy="50" r="4" fill="#C060C0" />
       </svg>
    </div>
  );
};

export default AnalogClock;