import React from 'react';
import { SearchProvider, SearchEngineId, AppLink, ThemeConfig, ThemeType } from './types';

// --- ICONS ---
export const Icons = {
  // UI
  Settings: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.43.875 1.19.875 2.02a4.5 4.5 0 01-8 2.828A4.5 4.5 0 0118.795 3m0 2.535a23.848 23.848 0 01-8.835 2.535" /></svg>,
  Apps: () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" /></svg>,
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
  Mic: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" /><path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" /></svg>,
  Sparkles: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 00-1.423 1.423z" /></svg>,
  Close: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>,
  Edit: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>,
  
  // Weather
  Drop: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 1.145.528 2.227 1.422 2.95l.102.083a.75.75 0 001.036-1.06l-.101-.083a2.977 2.977 0 01-.959-1.89V6z" clipRule="evenodd" /></svg>,
  Pin: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>,

  // Socials / Apps
  Google: () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.013-1.133 8.027-3.24 2.053-2.053 2.627-5.187 2.627-7.68 0-.76-.08-1.467-.173-2.16h-10.48z" /></svg>,
  Bing: () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M3.5 3.5v17l13.7-6.9-4.3-2.4 4.3-1.7-10.2-6zm3.3 3.8l5.2 2.9v4.2l-5.2 3z"/></svg>,
  Duck: () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>,
  Brave: () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12.013 1.5c-2.43 2.1-5.67 3.3-9 3.6 0 9.6 4.8 15.3 9 17.4 4.2-2.1 9-7.8 9-17.4-3.33-.3-6.57-1.5-9-3.6z"/></svg>,
  Yahoo: () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M2.5 3l6 9v9h4v-9l6-9h-4l-4 7-4-7z"/></svg>,
  
  // AI
  Brain: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>,
  Bot: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12h1.5m12 0h1.5m-1.5 3.75h1.5m-1.5-3.75H4.5m15 3.75h-15M8.25 21v-1.5m7.5 1.5v-1.5m-9-13.5h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9a2.25 2.25 0 012.25-2.25z" /></svg>,
  X: () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  
  // Sites
  Youtube: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  Reddit: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>,
  Images: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M13 9h5.5L13 3.5V9M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m0 16l4-5 3 4 5-7 2 3V4H6v14z"/></svg>,
  Wikipedia: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.09 13.06L14.7 4.5h2.57l-4.5 15h-2.3l-2-7.5-2 7.5H4.2l-4.5-15h2.5l2.6 8.56 2.05-8.56h2.2l2.05 8.56 2.6-8.56h.39"/></svg>,
  Quora: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M13.88 18.66c-.63.26-1.29.38-1.96.38-1.57 0-2.94-.58-3.96-1.68-.61-.66-1.05-1.46-1.26-2.31-.08-.34-.13-.69-.13-1.05 0-1.99.78-3.79 2.04-5.08 1.26-1.29 3.03-2.09 5.01-2.09 1.95 0 3.7.77 4.96 2.02 1.28 1.28 2.07 3.06 2.07 5.03 0 2.03-.84 3.86-2.19 5.14l1.24 1.24-.71.71-1.39-1.39c-1.05.73-2.32 1.15-3.69 1.15-.01 0-.02 0-.03 0zm5.66-2.09c.89-1.01 1.44-2.33 1.44-3.78 0-3.14-2.56-5.7-5.7-5.7-3.14 0-5.7 2.56-5.7 5.7 0 3.14 2.56 5.7 5.7 5.7.53 0 1.04-.07 1.53-.21l-2.4-2.4.71-.71 2.96 2.96c.5-.47.95-1 1.35-1.58z"/></svg>,
  
  // Google Apps
  Account: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>,
  GSearch: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-500"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>, // Placeholder for generic google icon
  GMaps: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-500"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>,
  GYoutube: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-600"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>,
  GPlay: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-teal-500"><path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.26 0 .5.08.71.21L19 10.5 5.21 21.29c-.21.13-.45.21-.71.21-.83 0-1.5-.67-1.5-1.5zM12.9 12.5l6.5 3.7c.6.35.6 1.25 0 1.6l-2.6 1.5-6.9-3.9 3-2.9zm-3.3-3.3l6.9-3.9 2.6 1.5c.6.35.6 1.25 0 1.6l-6.5 3.7-3-2.9z"/></svg>,
  GNews: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-500"><path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14H5v-2h6v2zm0-4H5v-2h6v2zm0-4H5V7h6v2zm8 8H13v-2h6v2zm0-4H13v-2h6v2zm0-4H13V7h6v2z"/></svg>,
  GGmail: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-500"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>,
  GMeet: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-500"><path d="M15 8v8H5V8h10m1-2H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4V7c0-.55-.45-1-1-1z"/></svg>,
  GDrive: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-600"><path d="M12.01 3L2 20h20L12.01 3zm2.52 13.5H9.47L6.2 13.5h11.6l-3.27 3zM14.5 9l3.5 6H11l-3.5-6h7zM8.5 9L5 15h-3l3.5-6h3z"/></svg>,
  GCalendar: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2.01.9-2.01 2L3 19c0 1.11.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>,
  GPhotos: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-purple-500"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>,
  GTranslate: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-700"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>,
  GDocs: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-500"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>,
  
  // Misc
  Mail: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>,
  Telegram: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
  Whatsapp: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  Discord: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1405-.104.2753-.213.402-.3222a.0772.0772 0 01.0817-.011 14.8143 14.8143 0 0012.019 0 .0772.0772 0 01.0817.011c.1267.1092.2615.2182.402.3222a.0772.0772 0 01-.0076.1277c-.5979.3428-1.2194.6447-1.8722.8923a.077.077 0 00-.0416.1057c.3602.699.7717 1.3638 1.226 1.9942a.0777.0777 0 00.0842.0276c1.9632-.6066 3.9401-1.5218 6.0045-3.0294a.077.077 0 00.0313-.0561c.6065-5.3673-1.4232-9.7481-3.7687-13.6604a.0664.0664 0 00-.032-.0277zM8.52 14.8462c-1.1825 0-2.1569-1.0855-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189zm7.0001 0c-1.1825 0-2.1569-1.0855-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
};

export const SEARCH_PROVIDERS: SearchProvider[] = [
  // Engines
  { id: SearchEngineId.GOOGLE, name: 'Google', icon: <Icons.Google />, urlTemplate: 'https://www.google.com/search?q=', mode: 'engines' },
  { id: SearchEngineId.BING, name: 'Bing', icon: <Icons.Bing />, urlTemplate: 'https://www.bing.com/search?q=', mode: 'engines' },
  { id: SearchEngineId.DUCKDUCKGO, name: 'DuckDuckGo', icon: <Icons.Duck />, urlTemplate: 'https://duckduckgo.com/?q=', mode: 'engines' },
  { id: SearchEngineId.BRAVE, name: 'Brave', icon: <Icons.Brave />, urlTemplate: 'https://search.brave.com/search?q=', mode: 'engines' },
  { id: SearchEngineId.YAHOO, name: 'Yahoo', icon: <Icons.Yahoo />, urlTemplate: 'https://search.yahoo.com/search?p=', mode: 'engines' },
  
  // AI
  { id: SearchEngineId.PERPLEXITY, name: 'Perplexity', icon: <Icons.Brain />, urlTemplate: 'https://www.perplexity.ai/search?q=', mode: 'ai' },
  { id: SearchEngineId.GEMINI, name: 'Gemini', icon: <Icons.Sparkles />, urlTemplate: 'https://gemini.google.com/app?q=', mode: 'ai' },
  { id: SearchEngineId.CHATGPT, name: 'ChatGPT', icon: <Icons.Bot />, urlTemplate: 'https://chatgpt.com/?q=', mode: 'ai' },
  { id: SearchEngineId.GROK, name: 'Grok', icon: <Icons.X />, urlTemplate: 'https://x.com/search?q=', mode: 'ai' },
  { id: SearchEngineId.CLAUDE, name: 'Claude', icon: <Icons.Bot />, urlTemplate: 'https://claude.ai/chat?q=', mode: 'ai' },

  // Sites
  { id: SearchEngineId.YOUTUBE, name: 'YouTube', icon: <Icons.Youtube />, urlTemplate: 'https://www.youtube.com/results?search_query=', mode: 'sites' },
  { id: SearchEngineId.REDDIT, name: 'Reddit', icon: <Icons.Reddit />, urlTemplate: 'https://www.reddit.com/search/?q=', mode: 'sites' },
  { id: SearchEngineId.IMAGES, name: 'Images', icon: <Icons.Images />, urlTemplate: 'https://www.google.com/search?tbm=isch&q=', mode: 'sites' },
  { id: SearchEngineId.WIKIPEDIA, name: 'Wikipedia', icon: <Icons.Wikipedia />, urlTemplate: 'https://en.wikipedia.org/wiki/Special:Search?search=', mode: 'sites' },
  { id: SearchEngineId.QUORA, name: 'Quora', icon: <Icons.Quora />, urlTemplate: 'https://www.quora.com/search?q=', mode: 'sites' }
];

export const GOOGLE_APPS: AppLink[] = [
  { name: 'Account', url: 'https://myaccount.google.com', iconComponent: <Icons.Account /> },
  { name: 'Search', url: 'https://google.com', iconComponent: <Icons.GSearch /> },
  { name: 'Maps', url: 'https://maps.google.com', iconComponent: <Icons.GMaps /> },
  { name: 'YouTube', url: 'https://youtube.com', iconComponent: <Icons.GYoutube /> },
  { name: 'Play', url: 'https://play.google.com', iconComponent: <Icons.GPlay /> },
  { name: 'News', url: 'https://news.google.com', iconComponent: <Icons.GNews /> },
  { name: 'Gmail', url: 'https://mail.google.com', iconComponent: <Icons.GGmail /> },
  { name: 'Meet', url: 'https://meet.google.com', iconComponent: <Icons.GMeet /> },
  { name: 'Drive', url: 'https://drive.google.com', iconComponent: <Icons.GDrive /> },
  { name: 'Calendar', url: 'https://calendar.google.com', iconComponent: <Icons.GCalendar /> },
  { name: 'Photos', url: 'https://photos.google.com', iconComponent: <Icons.GPhotos /> },
  { name: 'Translate', url: 'https://translate.google.com', iconComponent: <Icons.GTranslate /> },
  { name: 'Docs', url: 'https://docs.google.com', iconComponent: <Icons.GDocs /> }
];

export const SOCIAL_APPS: AppLink[] = [
    { name: 'Youtube', url: 'https://youtube.com', iconComponent: <Icons.Youtube /> },
    { name: 'Mail', url: 'https://gmail.com', iconComponent: <Icons.Mail /> },
    { name: 'Telegram', url: 'https://web.telegram.org', iconComponent: <Icons.Telegram /> },
    { name: 'Whatsapp', url: 'https://web.whatsapp.com', iconComponent: <Icons.Whatsapp /> },
    { name: 'X', url: 'https://x.com', iconComponent: <Icons.X /> },
    { name: 'Discord', url: 'https://discord.com/app', iconComponent: <Icons.Discord /> }
];

export const DEFAULT_THEME: ThemeConfig = {
  type: ThemeType.COLOR,
  color: '#E8DFF5',
  userName: 'Sayan',
  weather: {
      enabled: true,
      latitude: '40.7128',
      longitude: '-74.0060',
      locationName: 'Dam Dam',
      unit: 'celsius'
  },
  clock: {
      type: 'analog',
      showNumbers: false,
      use24Hour: true
  },
  dockEnabled: true
};