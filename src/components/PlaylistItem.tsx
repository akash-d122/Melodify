import React from "react";
import { Play, Pause, Heart } from "lucide-react";
import { formatTime } from "@/utils/formatTime";
import { Track } from "@/data/tracks";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { motion, AnimatePresence } from "framer-motion";

interface PlaylistItemProps {
  track: Track;
  isActive: boolean;
  isPlaying: boolean;
  onSelect: () => void;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ 
  track, 
  isActive, 
  isPlaying, 
  onSelect 
}) => {
  const { toggleFavorite, isFavorite } = useMusicPlayer();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`flex flex-col gap-2 p-3 rounded-lg transition-all cursor-pointer
        ${isActive 
          ? "bg-primary/10 backdrop-blur-md border border-white/10 shadow-lg shadow-black/5 dark:shadow-white/5" 
          : "hover:bg-background/20 backdrop-blur-md border border-white/5"
        }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3">
        <motion.div 
          className="relative w-12 h-12 flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.img 
            src={track.cover} 
            alt={track.album} 
            className="w-full h-full object-cover rounded-lg shadow-lg shadow-black/5 dark:shadow-white/5"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
          <AnimatePresence>
            {isActive && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Pause size={18} className="text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Play size={18} className="text-white" />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <div className="flex-grow min-w-0">
          <motion.div 
            className="font-medium truncate bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {track.title}
          </motion.div>
          <motion.div 
            className="text-sm text-muted-foreground/80 truncate"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {track.artist}
          </motion.div>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors backdrop-blur-md"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(track.id);
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <AnimatePresence mode="wait">
              {isFavorite(track.id) ? (
                <motion.div
                  key="filled"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Heart size={18} className="fill-primary text-primary" />
                </motion.div>
              ) : (
                <motion.div
                  key="outline"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Heart size={18} className="text-muted-foreground/80" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.div 
            className="text-sm text-muted-foreground/80 px-2 py-1 rounded-full bg-background/20 backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {formatTime(track.duration)}
          </motion.div>
        </div>
      </div>

      {isActive && (
        <motion.div 
          className="w-full h-1.5 rounded-full bg-background/20 backdrop-blur-md overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 6 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <motion.div 
            className="h-full bg-primary/80 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default PlaylistItem;
