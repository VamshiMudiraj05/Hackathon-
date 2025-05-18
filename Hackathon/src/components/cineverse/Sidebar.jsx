import { motion } from 'framer-motion';
import { FaHeart, FaFilm, FaHome } from 'react-icons/fa';
import { MdLocalMovies } from 'react-icons/md';
import Filters from './Filters';

const Sidebar = ({
  showLiked,
  onShowLikedChange,
  likedMovies,
  genres,
  years,
  filters,
  onFilterChange,
  onMovieSelect
}) => {
  const colors = {
    primary: '#FF5F6D',
    secondary: '#FFC371',
    darkBg: '#0F172A',
    cardBg: 'rgba(30, 41, 59, 0.7)',
    text: '#E2E8F0',
  };

  return (
    <motion.div 
      className="w-80 flex-shrink-0 border-r flex flex-col h-screen"
      style={{ 
        backgroundColor: colors.darkBg,
        borderColor: 'rgba(255, 255, 255, 0.1)'
      }}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Background Gradient Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/30 to-transparent animate-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,95,109,0.1),rgba(255,195,113,0.1))]" />
      </div>

      {/* Fixed Header Section */}
      <div className="p-6 pb-4">
        {/* App Header with 3D Effect */}
        <motion.div 
          className="flex items-center gap-3 mb-8 relative"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: colors.primary }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.2, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <FaFilm className="text-3xl relative z-10" style={{ color: colors.primary }} />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent relative" 
              style={{ 
                backgroundImage: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                textShadow: '0 0 20px rgba(255, 95, 109, 0.3)'
              }}>
            Cineverse
          </h1>
        </motion.div>

        {/* Navigation with Glassmorphism */}
        <nav className="space-y-2 mb-8 relative">
          <motion.button 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all backdrop-blur-md ${
              !showLiked ? 'bg-white/10' : 'hover:bg-white/5'
            }`}
            onClick={() => onShowLikedChange(false)}
            style={{ color: colors.text }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaHome className="text-lg" />
            <span>All Movies</span>
          </motion.button>
          <motion.button 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all backdrop-blur-md ${
              showLiked ? 'bg-white/10' : 'hover:bg-white/5'
            }`}
            onClick={() => onShowLikedChange(true)}
            style={{ color: colors.text }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaHeart className="text-lg" style={{ color: colors.primary }} />
            <span>My Collection</span>
            <motion.span 
              className="ml-auto px-2 py-1 text-xs rounded-full" 
              style={{ 
                backgroundColor: colors.primary,
                color: colors.darkBg,
                boxShadow: '0 0 10px rgba(255, 95, 109, 0.3)'
              }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {likedMovies.length}
            </motion.span>
          </motion.button>
        </nav>
      </div>

      {/* Scrollable Filters Section */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="relative backdrop-blur-md rounded-xl p-4" style={{ backgroundColor: 'rgba(30, 41, 59, 0.3)' }}>
          <Filters
            genres={genres}
            years={years}
            filters={filters}
            onFilterChange={onFilterChange}
          />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/10 to-transparent" />
      <div className="absolute top-1/2 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
    </motion.div>
  );
};

export default Sidebar; 