import { MdOutlineMovieFilter } from 'react-icons/md';
import { useState, useEffect } from 'react';

const Filters = ({ 
  genres = [], 
  years = [], 
  filters = { genre: null, year: null }, 
  onFilterChange 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const colors = {
    primary: '#FF5F6D',
    secondary: '#FFC371',
    darkBg: '#0F172A',
    cardBg: 'rgba(30, 41, 59, 0.7)',
    text: '#E2E8F0',
  };

  // Handle loading state
  useEffect(() => {
    if (genres.length > 0 && years.length > 0) {
      setIsLoading(false);
    }
  }, [genres, years]);

  const handleYearSelect = (event) => {
    try {
      const year = event.target.value;
      console.log('Selecting year:', year);
      onFilterChange('year', year ? parseInt(year) : null);
    } catch (error) {
      console.error('Error selecting year:', error);
    }
  };

  // Log props for debugging
  useEffect(() => {
    console.log('Filters props:', { genres, years, filters });
  }, [genres, years, filters]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <MdOutlineMovieFilter className="text-xl animate-pulse" style={{ color: colors.primary }} />
          <span className="font-medium text-lg animate-pulse" style={{ color: colors.text }}>Loading Filters...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Icon */}
      <div className="flex items-center gap-2">
        <div>
          <MdOutlineMovieFilter className="text-xl" style={{ color: colors.primary }} />
        </div>
        <span className="font-medium text-lg" style={{ color: colors.text }}>Filters</span>
      </div>

      {/* Genre Filter with Buttons */}
      {genres.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-3 px-1" style={{ color: colors.text }}>Genres</h4>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => onFilterChange('genre', genre.id)}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                  filters.genre === genre.id 
                    ? 'text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
                style={{ 
                  backgroundColor: filters.genre === genre.id 
                    ? `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`
                    : 'rgba(255, 255, 255, 0.1)',
                  border: filters.genre === genre.id 
                    ? 'none' 
                    : '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: filters.genre === genre.id 
                    ? `0 0 15px ${colors.primary}40` 
                    : 'none'
                }}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Year Filter with Buttons */}
      {years.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-3 px-1" style={{ color: colors.text }}>Release Year</h4>
          <div className="flex flex-wrap gap-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => handleYearSelect({ target: { value: year } })}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                  filters.year === year 
                    ? 'text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
                style={{
                  backgroundColor: filters.year === year
                    ? `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`
                    : 'rgba(255, 255, 255, 0.1)',
                  border: filters.year === year
                    ? 'none'
                    : '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: filters.year === year
                    ? `0 0 15px ${colors.primary}40`
                    : 'none'
                }}
              >
                {year}
              </button>
            ))}
             <button
                key="all"
                onClick={() => handleYearSelect({ target: { value: '' } })}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                  filters.year === null 
                    ? 'text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
                style={{
                  backgroundColor: filters.year === null
                    ? `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`
                    : 'rgba(255, 255, 255, 0.1)',
                  border: filters.year === null
                    ? 'none'
                    : '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: filters.year === null
                    ? `0 0 15px ${colors.primary}40`
                    : 'none'
                }}
              >
                All Years
              </button>
          </div>
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-primary/10 to-transparent" />
    </div>
  );
};

export default Filters; 