import React, { useState, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart } from "lucide-react";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { formatTime } from "@/utils/formatTime";
import { motion } from "framer-motion";

const FooterPlayer: React.FC = () => {
  const { 
    currentTrack, 
    isPlaying, 
    currentTime, 
    volume, 
    handlePlayPause,
    handleNext,
    handlePrevious,
    handleVolumeChange,
    handleSeek,
    toggleFavorite,
    isFavorite
  } = useMusicPlayer();

  const [isDragging, setIsDragging] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const progress = currentTrack ? (currentTime / currentTrack.duration) * 100 : 0;
  const isMuted = volume === 0;

  const calculateTimeFromMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !currentTrack) return 0;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    return Math.max(0, Math.min(currentTrack.duration, percentage * currentTrack.duration));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) {
      setHoverTime(calculateTimeFromMouse(e));
    }
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setHoverTime(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const newTime = calculateTimeFromMouse(e);
    handleSeek(newTime);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!currentTrack) return null;

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border/50 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="w-full px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 max-w-4xl mx-auto">
          {/* Track Info */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-md overflow-hidden">
              <img 
                src={currentTrack.cover} 
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow sm:flex-grow-0 min-w-0">
              <h3 className="text-sm sm:text-base font-medium line-clamp-1">{currentTrack.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{currentTrack.artist}</p>
            </div>
            <motion.button
              onClick={() => toggleFavorite(currentTrack.id)}
              className="p-2 rounded-full text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart 
                size={18} 
                className={isFavorite ? "fill-primary text-primary" : ""} 
              />
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="w-full sm:w-auto flex-grow sm:flex-grow-0">
            <div 
              ref={progressRef}
              className="relative h-2 bg-muted/50 rounded-full cursor-pointer group"
              onClick={(e) => {
                const newTime = calculateTimeFromMouse(e);
                handleSeek(newTime);
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            >
              <div 
                className="absolute h-full bg-primary rounded-full"
                style={{ width: `${progress}%` }}
              />
              <motion.div
                className="absolute h-full w-2 bg-primary rounded-full -translate-y-1/2 top-1/2"
                style={{ left: `${progress}%` }}
                animate={{
                  scale: isDragging ? 1.5 : 1,
                  y: isDragging ? -2 : 0
                }}
              />
              {hoverTime !== null && !isDragging && (
                <motion.div
                  className="absolute h-full w-2 bg-primary/50 rounded-full -translate-y-1/2 top-1/2"
                  style={{ left: `${(hoverTime / currentTrack.duration) * 100}%` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(currentTrack.duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.button
              onClick={handlePrevious}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <SkipBack size={18} className="sm:w-5 sm:h-5" />
            </motion.button>
            <motion.button
              onClick={handlePlayPause}
              className="p-2.5 sm:p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? <Pause size={18} className="sm:w-5 sm:h-5" /> : <Play size={18} className="sm:w-5 sm:h-5" />}
            </motion.button>
            <motion.button
              onClick={handleNext}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <SkipForward size={18} className="sm:w-5 sm:h-5" />
            </motion.button>
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => handleVolumeChange(isMuted ? 50 : 0)}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMuted ? <VolumeX size={18} className="sm:w-5 sm:h-5" /> : <Volume2 size={18} className="sm:w-5 sm:h-5" />}
              </motion.button>
              <div className="w-20 sm:w-24 h-1 bg-muted/50 rounded-full relative group">
                <div 
                  className="absolute h-full bg-primary rounded-full"
                  style={{ width: `${volume * 100}%` }}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume * 100}
                  onChange={(e) => handleVolumeChange(Number(e.target.value) / 100)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FooterPlayer;
