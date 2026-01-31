import React, { useState } from 'react';
import { SearchProvider, SearchMode, SearchEngineId } from '../types';
import { SEARCH_PROVIDERS, Icons } from '../constants';
import { saveEngineId } from '../services/storage.ts';

interface SearchBarProps {
  initialEngineId: SearchEngineId;
}

const SearchBar: React.FC<SearchBarProps> = ({ initialEngineId }) => {
  const [query, setQuery] = useState('');
  
  // Find initial provider and set mode accordingly
  const initialProvider = SEARCH_PROVIDERS.find(e => e.id === initialEngineId) || SEARCH_PROVIDERS[0];
  const [selectedProvider, setSelectedProvider] = useState<SearchProvider>(initialProvider);
  const [mode, setMode] = useState<SearchMode>(initialProvider.mode);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const url = `${selectedProvider.urlTemplate}${encodeURIComponent(query)}`;
    window.location.href = url;
  };

  const handleProviderSelect = (provider: SearchProvider) => {
    setSelectedProvider(provider);
    saveEngineId(provider.id);
  };

  const handleModeChange = (newMode: SearchMode) => {
      setMode(newMode);
      // Select first provider of that mode to be safe
      const first = SEARCH_PROVIDERS.find(p => p.mode === newMode);
      if (first) {
          handleProviderSelect(first);
      }
  }

  // Filter providers for chips
  const currentProviders = SEARCH_PROVIDERS.filter(p => p.mode === mode);

  return (
    <div className="w-full flex flex-col gap-8">
      
      {/* Search Input Box - Dynamic styling based on provider */}
      <form 
        onSubmit={handleSearch}
        className="relative flex items-center w-full h-16 bg-white/60 backdrop-blur-xl rounded-[2rem] shadow-lg ring-1 ring-white/60 px-2 transition-all hover:shadow-xl hover:bg-white/80"
      >
        <div className={`pl-4 ${mode === 'ai' ? 'text-indigo-600' : 'text-fuchsia-700'}`}>
           {selectedProvider.icon}
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${selectedProvider.name}...`}
          className="flex-1 h-full bg-transparent border-none outline-none text-gray-800 text-lg placeholder-gray-500/70 px-4 font-medium"
          autoFocus
        />

        <button type="button" className="p-3 text-gray-500 hover:text-fuchsia-700 transition-colors">
            <Icons.Mic />
        </button>

        <button 
          type="submit"
          className={`mr-1 px-6 py-2.5 rounded-full text-white font-medium transition-transform active:scale-95 shadow-md ${
              mode === 'ai' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-fuchsia-600 hover:bg-fuchsia-700'
          }`}
        >
          Go
        </button>
      </form>

      {/* Mode Toggles */}
      <div className="flex gap-2 p-1 bg-white/30 backdrop-blur-sm rounded-full self-start">
          {(['engines', 'sites', 'ai'] as SearchMode[]).map((m) => (
              <button
                key={m}
                onClick={() => handleModeChange(m)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    mode === m 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'text-gray-600 hover:bg-white/40'
                }`}
              >
                  {m === 'engines' ? 'Engines' : m === 'sites' ? 'Sites' : 'AI Tools'}
              </button>
          ))}
      </div>

      {/* Provider Chips Area - Removed the descriptive mode label pill */}
      <div className="flex flex-wrap gap-3">
          {currentProviders.map((provider) => {
              const isSelected = selectedProvider.id === provider.id;

              return (
                <button
                    key={provider.id}
                    onClick={() => handleProviderSelect(provider)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all border ${
                        isSelected 
                            ? 'bg-white border-fuchsia-200 shadow-sm ring-2 ring-fuchsia-100 transform scale-105' 
                            : 'bg-white/40 border-transparent hover:bg-white/60'
                    }`}
                >
                    <span className={`${isSelected ? 'text-fuchsia-600' : 'text-gray-600'}`}>
                        {provider.icon}
                    </span>
                    <span className={`font-medium ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>{provider.name}</span>
                </button>
              );
          })}
      </div>
    </div>
  );
};

export default SearchBar;