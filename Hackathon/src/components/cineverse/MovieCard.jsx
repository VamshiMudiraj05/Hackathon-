import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';

const MovieCard = ({ movie, isLiked, onLike, onSelect, onMouseEnter, onMouseLeave }) => {
  const colors = {
    primary: '#FF5F6D',
    secondary: '#FFC371',
    darkBg: '#0F172A',
    cardBg: 'rgba(30, 41, 59, 0.7)',
    text: '#E2E8F0',
  };

  return (
    <motion.div
      className="relative group perspective"
      onMouseEnter={() => onMouseEnter(movie)}
      onMouseLeave={() => onMouseLeave(null)}
      whileHover="hover"
      initial="rest"
      animate="rest"
      variants={{
        rest: { scale: 1 },
        hover: { scale: 1.02 }
      }}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer transform-gpu"
        style={{ 
          backgroundColor: colors.cardBg,
          backdropFilter: 'blur(10px)',
          transformStyle: 'preserve-3d'
        }}
        onClick={() => onSelect(movie)}
        variants={{
          rest: { rotateX: 0, rotateY: 0 },
          hover: { rotateX: 5, rotateY: 5 }
        }}
      >
        {/* Poster Image with Gradient Overlay */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Content Overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-4"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 }
          }}
        >
          {/* Title with Glow Effect */}
          <motion.h3 
            className="text-lg font-bold mb-2"
            style={{ 
              color: colors.text,
              textShadow: '0 0 10px rgba(255, 95, 109, 0.5)'
            }}
            variants={{
              rest: { y: 20, opacity: 0 },
              hover: { y: 0, opacity: 1 }
            }}
          >
            {movie.title}
          </motion.h3>

          {/* Movie Info */}
          <motion.div
            className="flex items-center gap-3 text-sm mb-3"
            variants={{
              rest: { y: 20, opacity: 0 },
              hover: { y: 0, opacity: 1 }
            }}
          >
            <div className="flex items-center" style={{ color: colors.secondary }}>
              <FaStar className="mr-1" />
              <span>{movie.vote_average?.toFixed(1)}</span>
            </div>
            <div style={{ color: colors.text }}>
              {movie.release_date?.substring(0, 4)}
            </div>
          </motion.div>

          {/* Overview with Gradient Text */}
          <motion.p
            className="text-xs line-clamp-2 mb-4"
            style={{ 
              color: colors.text,
              background: `linear-gradient(45deg, ${colors.text}, ${colors.secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            variants={{
              rest: { y: 20, opacity: 0 },
              hover: { y: 0, opacity: 1 }
            }}
          >
            {movie.overview || 'No overview available.'}
          </motion.p>

          {/* Like Button */}
          <motion.div
            className="flex justify-end"
            variants={{
              rest: { y: 20, opacity: 0 },
              hover: { y: 0, opacity: 1 }
            }}
          >
            <button 
              className={`p-2 rounded-full transition-all duration-300 ${
                isLiked 
                  ? 'bg-red-500/20 hover:bg-red-500/30' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
              onClick={(e) => onLike(movie, e)}
              aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isLiked ? (
                <FaHeart style={{ color: colors.primary }} />
              ) : (
                <FaRegHeart style={{ color: colors.text }} />
              )}
            </button>
          </motion.div>
        </motion.div>

        {/* Rating Badge with Glassmorphism */}
        <div 
          className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold backdrop-blur-md"
          style={{ 
            backgroundColor: 'rgba(255, 195, 113, 0.2)',
            border: '1px solid rgba(255, 195, 113, 0.3)',
            color: colors.secondary
          }}
        >
          <FaStar />
          <span>{movie.vote_average?.toFixed(1)}</span>
        </div>

        {/* Glow Effect */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: `0 0 20px ${colors.primary}40`,
            pointerEvents: 'none'
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default MovieCard; 