import React from "react";
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Maximize2 } from "lucide-react";
import { Link } from "react-router-dom";
import TrackProgress from "./TrackProgress";
import VolumeControl from "./VolumeControl";
import { Track } from "@/data/tracks";
import { formatTime } from "@/utils/formatTime";
import MusicVisualizer from "./MusicVisualizer";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { motion, AnimatePresence } from "framer-motion";

interface MusicPlayerProps {
  currentTrack: Track;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onShuffle: () => void;
  onRepeat: () => void;
  shuffleActive: boolean;
  repeatActive: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ 
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onShuffle,
  onRepeat,
  shuffleActive,
  repeatActive
}) => {
  const { currentTime, handleSeek, volume, handleVolumeChange } = useMusicPlayer();
  
  const getBackgroundStyle = () => {
    return {
      backgroundImage: `linear-gradient(to bottom, ${currentTrack.color}22, transparent)`
    };
  };
  
  return (
    <motion.div 
      className="w-full relative p-3 sm:p-6 md:p-8 rounded-2xl"
      style={getBackgroundStyle()}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex flex-col md:flex-row gap-3 sm:gap-6 md:gap-12 items-center">
        <motion.div 
          className="relative w-40 sm:w-56 md:w-64 h-40 sm:h-56 md:h-64 flex-shrink-0 album-shadow rounded-lg overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <img 
            src={currentTrack.cover}
            alt={`${currentTrack.album} cover`}
            className={`w-full h-full object-cover ${isPlaying ? "animate-pulse-subtle" : ""}`}
          />
          <Link 
            to="/now-playing"
            className="absolute inset-0 bg-black/0 hover:bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
          >
            <Maximize2 size={20} className="text-white" />
          </Link>
        </motion.div>
        
        <div className="flex flex-col gap-3 sm:gap-6 w-full">
          <motion.div 
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex-grow text-center sm:text-left">
              <h2 className="text-lg sm:text-2xl font-bold line-clamp-1">
                {currentTrack.title}
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {currentTrack.artist}
              </p>
            </div>
          </motion.div>

          <div className="w-full px-2 sm:px-0">
            <TrackProgress 
              currentTime={currentTime}
              duration={currentTrack.duration}
              onSeek={handleSeek}
            />
          </div>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 sm:gap-4">
              <motion.button
                onClick={onShuffle}
                className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                  shuffleActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                <Shuffle size={18} className="sm:w-5 sm:h-5" />
              </motion.button>
              <motion.button
                onClick={onPrevious}
                className="p-1.5 sm:p-2 rounded-full text-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                <SkipBack size={18} className="sm:w-5 sm:h-5" />
              </motion.button>
              <motion.button
                onClick={onPlayPause}
                className="p-2 sm:p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                <AnimatePresence mode="wait">
                  {isPlaying ? (
                    <motion.div
                      key="pause"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Pause size={20} className="sm:w-6 sm:h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="play"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Play size={20} className="sm:w-6 sm:h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              <motion.button
                onClick={onNext}
                className="p-1.5 sm:p-2 rounded-full text-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                <SkipForward size={18} className="sm:w-5 sm:h-5" />
              </motion.button>
              <motion.button
                onClick={onRepeat}
                className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                  repeatActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                <Repeat size={18} className="sm:w-5 sm:h-5" />
              </motion.button>
            </div>

            <div className="w-full sm:w-auto">
              <VolumeControl 
                volume={volume}
                onVolumeChange={handleVolumeChange}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
