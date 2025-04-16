import React from "react";
import MusicPlayer from "@/components/MusicPlayer";
import Playlist from "@/components/Playlist";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const { 
    tracks,
    currentTrackId,
    currentTrack,
    isPlaying,
    shuffleActive,
    repeatActive,
    handlePlayPause,
    handleNext,
    handlePrevious,
    handleTrackSelect,
    toggleShuffle,
    toggleRepeat,
  } = useMusicPlayer();
  
  const getBackgroundStyle = () => {
    return {
      backgroundImage: `linear-gradient(to bottom, ${currentTrack?.color || 'var(--primary)'}22, transparent)`
    };
  };
  
  return (
    <div className="pb-16">
      <motion.div 
        className="flex flex-col mb-8 p-4 sm:p-6 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg"
        style={getBackgroundStyle()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-2">
          Home
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Your personal music experience
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
        <div className="lg:col-span-2">
          {currentTrack && (
            <MusicPlayer 
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onShuffle={toggleShuffle}
              onRepeat={toggleRepeat}
              shuffleActive={shuffleActive}
              repeatActive={repeatActive}
            />
          )}
        </div>
        
        <div>
          <Playlist 
            tracks={tracks}
            currentTrackId={currentTrackId}
            isPlaying={isPlaying}
            onTrackSelect={handleTrackSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
