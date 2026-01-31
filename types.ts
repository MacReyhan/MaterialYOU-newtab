export enum SearchEngineId {
  // Engines
  GOOGLE = 'google',
  BING = 'bing',
  DUCKDUCKGO = 'duckduckgo',
  BRAVE = 'brave',
  YAHOO = 'yahoo',
  // AI
  PERPLEXITY = 'perplexity',
  GEMINI = 'gemini',
  CHATGPT = 'chatgpt',
  GROK = 'grok',
  CLAUDE = 'claude',
  // Sites
  YOUTUBE = 'youtube',
  REDDIT = 'reddit',
  IMAGES = 'images',
  WIKIPEDIA = 'wikipedia',
  QUORA = 'quora'
}

export type SearchMode = 'engines' | 'sites' | 'ai';

export interface SearchProvider {
  id: SearchEngineId;
  name: string;
  icon: React.ReactNode;
  urlTemplate: string;
  mode: SearchMode;
}

export enum ThemeType {
  COLOR = 'color',
  IMAGE = 'image'
}

export type ClockType = 'analog' | 'digital' | 'slick';

export interface WeatherConfig {
  enabled: boolean;
  latitude: string;
  longitude: string;
  locationName: string;
  unit: 'celsius' | 'fahrenheit';
}

export interface ThemeConfig {
  type: ThemeType;
  color: string;
  backgroundImageUrl?: string;
  userName: string;
  userProfilePicUrl?: string; 
  weather: WeatherConfig;
  clock: {
    type: ClockType;
    showNumbers: boolean; 
    use24Hour: boolean;
  };
  dockEnabled: boolean;
}

export interface AppLink {
  name: string;
  url: string;
  iconComponent: React.ReactNode;
}