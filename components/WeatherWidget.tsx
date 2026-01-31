import React, { useEffect, useState } from 'react';
import { WeatherConfig, ThemeType } from '../types';
import { Icons } from '../constants';

interface WeatherWidgetProps {
  config: WeatherConfig;
  themeType: ThemeType;
}

interface WeatherData {
    temp: number;
    humidity: number;
    feelsLike: number;
    weatherCode: number;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ config, themeType }) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!config.enabled || !config.latitude || !config.longitude) {
        setData(null);
        return;
    }

    const fetchWeather = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${config.latitude}&longitude=${config.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&temperature_unit=${config.unit}`
            );
            const json = await res.json();
            if (json.current) {
                setData({
                    temp: json.current.temperature_2m,
                    humidity: json.current.relative_humidity_2m,
                    feelsLike: json.current.apparent_temperature,
                    weatherCode: json.current.weather_code
                });
            } else {
                setError(true);
            }
        } catch (e) {
            console.error(e);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    fetchWeather();
    // Refresh every 30 mins
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [config]);

  if (!config.enabled) return null;

  // Simple weather code mapping for display text
  const getWeatherDescription = (code: number) => {
      if (code === 0) return 'Clear';
      if (code <= 3) return 'Partly Cloudy';
      if (code <= 48) return 'Mist';
      if (code <= 67) return 'Rain';
      if (code <= 77) return 'Snow';
      return 'Cloudy';
  };

  if (loading && !data) return <div className="animate-pulse bg-white/40 h-32 rounded-3xl w-80"></div>;
  if (error || !data) return null;

  const description = getWeatherDescription(data.weatherCode);

  return (
    <div className="flex gap-6 items-center">
        {/* Main Info Card */}
        <div className="bg-white/40 backdrop-blur-md p-5 rounded-[2rem] shadow-sm flex flex-col gap-4 min-w-[320px]">
            <div className="text-gray-800 text-lg font-medium ml-1">
                {description}
            </div>
            
            {/* Humidity Bar */}
            <div className="flex items-center gap-3">
                <div className="flex-1 bg-white/50 h-10 rounded-full overflow-hidden flex items-center px-1 relative">
                    <div 
                        className="absolute left-0 top-0 bottom-0 bg-fuchsia-600/70 rounded-full transition-all duration-1000"
                        style={{ width: `${data.humidity}%` }}
                    />
                    <span className="relative z-10 text-white text-sm font-medium px-3">
                        Humidity {data.humidity}%
                    </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-fuchsia-600/70 flex items-center justify-center text-white">
                    <Icons.Drop />
                </div>
            </div>

            {/* Bottom Row: Feels Like + Location */}
            <div className="flex gap-3">
                <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2 text-sm text-gray-700 font-medium shadow-sm">
                    <span className="text-fuchsia-600"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-4.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg></span>
                    Feels {Math.round(data.feelsLike)}°{config.unit === 'celsius' ? 'C' : 'F'}
                </div>
                <div className="bg-fuchsia-600/70 text-white rounded-full px-5 py-2 flex items-center gap-2 text-sm font-medium shadow-sm flex-1 justify-center">
                    <Icons.Pin />
                    {config.locationName || 'Location'}
                </div>
            </div>
        </div>

        {/* Large Temperature Blob */}
        <div className="relative w-32 h-32 bg-white/40 backdrop-blur-md rounded-[2.5rem] flex flex-col items-center justify-center text-fuchsia-900 shadow-sm" style={{ borderTopRightRadius: '50%', borderBottomLeftRadius: '50%' }}>
            <div className="text-5xl font-bold tracking-tighter flex">
                {Math.round(data.temp)}
                <span className="text-2xl mt-1 text-fuchsia-700">°{config.unit === 'celsius' ? 'C' : 'F'}</span>
            </div>
            {/* Simple cloud icon representation */}
            <svg className="w-10 h-10 mt-1 opacity-40 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
        </div>
    </div>
  );
};

export default WeatherWidget;