import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import MovieGrid from './MovieGrid';

const Cineverse = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [likedMovies, setLikedMovies] = useState(() => {
    try {
      const savedLikes = JSON.parse(localStorage.getItem('likedMovies') || '[]');
      return Array.isArray(savedLikes) ? savedLikes : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [showLiked, setShowLiked] = useState(false);
  const [filters, setFilters] = useState({
    genre: null,
    year: null,
  });

  // Available years (last 20 years)
  const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

  const fetchMovies = useCallback(async (pageNum = 1, append = false) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setIsLoadingMore(true);
      
      const params = {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        with_original_language: 'te',
        sort_by: 'popularity.desc',
        page: pageNum,
      };

      // Add genre filter if selected
      if (filters.genre) {
        params.with_genres = filters.genre;
      }

      // Add year filter if selected
      if (filters.year) {
        params.year = filters.year;
      }

      const response = await axios.get(
        'https://api.themoviedb.org/3/discover/movie',
        { params }
      );
      
      if (append) {
        setMovies(prev => [...prev, ...response.data.results]);
      } else {
        setMovies(response.data.results);
      }
      
      setPage(pageNum);
      setHasMore(response.data.page < response.data.total_pages);
    } catch {
      // Optionally handle error here, e.g., set an error state or log passively
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, [filters.genre, filters.year]);

  // Fetch genres on mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
        );
        setGenres(response.data.genres);
      } catch {
        // Optionally handle error here
      }
    };
    
    fetchGenres();
  }, []);

  // Fetch movies when filters change
  useEffect(() => {
    setPage(1);
    fetchMovies(1, false);
  }, [filters, fetchMovies]);

  // Load more movies
  const handleLoadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      fetchMovies(page + 1, true);
    }
  }, [fetchMovies, page, isLoadingMore, hasMore]);

  // Toggle like for a movie
  const toggleLike = (movie, e) => {
    e?.stopPropagation();
    setLikedMovies(prevLikes => {
      const isLiked = prevLikes.some(m => m.id === movie.id);
      const newLikes = isLiked 
        ? prevLikes.filter(m => m.id !== movie.id)
        : [...prevLikes, movie];
      localStorage.setItem('likedMovies', JSON.stringify(newLikes));
      return newLikes;
    });
  };

  // Filter movies based on showLiked state
  const displayedMovies = showLiked ? likedMovies : movies;

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
      <Sidebar
        showLiked={showLiked}
        onShowLikedChange={setShowLiked}
        likedMovies={likedMovies}
        genres={genres}
        years={years}
        filters={filters}
        onFilterChange={(type, value) => setFilters(prev => ({
          ...prev,
          [type]: prev[type] === value ? null : value
        }))}
      />
      <MovieGrid
        movies={displayedMovies}
        likedMovies={likedMovies}
        onLike={toggleLike}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        isLoading={loading || isLoadingMore}
      />
    </div>
  );
};

export default Cineverse; 