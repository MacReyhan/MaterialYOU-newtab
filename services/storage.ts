import { ThemeConfig, SearchEngineId } from '../types';
import { DEFAULT_THEME } from '../constants';

const THEME_KEY = 'my_tab_theme';
const ENGINE_KEY = 'my_tab_engine';

export const getTheme = (): ThemeConfig => {
  const stored = localStorage.getItem(THEME_KEY);
  if (!stored) return DEFAULT_THEME;
  try {
    const parsed = JSON.parse(stored);
    return { 
        ...DEFAULT_THEME, 
        ...parsed, 
        weather: { 
            ...DEFAULT_THEME.weather, 
            ...(parsed.weather || {}) 
        },
        clock: {
            ...DEFAULT_THEME.clock,
            ...(parsed.clock || {})
        }
    };
  } catch {
    return DEFAULT_THEME;
  }
};

export const saveTheme = (theme: ThemeConfig) => {
  localStorage.setItem(THEME_KEY, JSON.stringify(theme));
};

export const getSavedEngineId = (): SearchEngineId => {
  return (localStorage.getItem(ENGINE_KEY) as SearchEngineId) || SearchEngineId.GOOGLE;
};

export const saveEngineId = (id: SearchEngineId) => {
  localStorage.setItem(ENGINE_KEY, id);
};