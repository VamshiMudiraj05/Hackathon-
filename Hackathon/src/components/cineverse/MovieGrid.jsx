import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useCallback } from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, likedMovies, onMovieSelect, onLike, onLoadMore, hasMore, isLoading }) => {
  const colors = {
    primary: '#FF5F6D',
    secondary: '#FFC371',
    darkBg: '#0F172A',
    cardBg: 'rgba(30, 41, 59, 0.7)',
    text: '#E2E8F0',
  };

  // Animation variants for the grid
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Intersection Observer setup for infinite scrolling
  const observer = useRef();
  const lastMovieElementRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        onLoadMore();
      }
    }, { threshold: 0.5 });

    if (node) observer.current.observe(node);
  }, [isLoading, hasMore, onLoadMore]);

  return (
    <div className="flex-1 overflow-y-auto p-8 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Container */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence>
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              ref={index === movies.length - 1 ? lastMovieElementRef : null}
              variants={itemVariants}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              <MovieCard
                movie={movie}
                isLiked={likedMovies.some(m => m.id === movie.id)}
                onLike={onLike}
                onSelect={onMovieSelect}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {movies.length === 0 && !isLoading && (
        <motion.div
          className="flex flex-col items-center justify-center h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4" style={{ color: colors.primary }}>🎬</div>
          <h3 className="text-xl font-medium mb-2" style={{ color: colors.text }}>
            No Movies Found
          </h3>
          <p className="text-sm" style={{ color: colors.text + '80' }}>
            Try adjusting your filters or search criteria
          </p>
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md"
               style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: colors.primary }} />
            <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: colors.secondary }} />
            <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: colors.primary }} />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MovieGrid; 