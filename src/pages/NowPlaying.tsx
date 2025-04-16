
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, X, Heart } from "lucide-react";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { formatTime } from "@/utils/formatTime";
import TrackProgress from "@/components/TrackProgress";
import VolumeControl from "@/components/VolumeControl";
import MusicVisualizer from "@/components/MusicVisualizer";

const NowPlaying: React.FC = () => {
  const { 
    currentTrack,
    isPlaying,
    currentTime,
    volume,
    shuffleActive,
    repeatActive,
    handlePlayPause,
    handleNext,
    handlePrevious,
    handleSeek,
    handleVolumeChange,
    toggleShuffle,
    toggleRepeat,
    toggleFavorite,
    isFavorite
  } = useMusicPlayer();
  
  const navigate = useNavigate();
  
  // If there's no current track, redirect to home
  useEffect(() => {
    if (!currentTrack) {
      navigate('/');
    }
  }, [currentTrack, navigate]);
  
  if (!currentTrack) return null;
  
  return (
    <div className="fixed inset-0 bg-background z-50 p-4 md:p-8 flex flex-col">
      <div className="flex justify-end mb-4">
        <button 
          className="p-2 rounded-full hover:bg-secondary"
          onClick={() => navigate(-1)}
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-6xl mx-auto w-full h-full">
        {/* Album Art Section */}
        <div className="relative w-full max-w-md aspect-square flex-shrink-0">
          <img 
            src={currentTrack.cover}
            alt={`${currentTrack.album} cover`}
            className="w-full h-full object-cover rounded-lg shadow-2xl"
          />
          <div 
            className="absolute inset-0 rounded-lg opacity-20"
            style={{ 
              background: `radial-gradient(circle at center, ${currentTrack.color}80, transparent 70%)`,
              animation: isPlaying ? "pulse 4s infinite" : "none" 
            }}
          />
          
          {isPlaying && (
            <div className="absolute bottom-6 left-6">
              <MusicVisualizer isPlaying={true} />
            </div>
          )}
        </div>
        
        {/* Controls Section */}
        <div className="flex flex-col w-full max-w-lg gap-8">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">{currentTrack.title}</h1>
              <button
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                onClick={() => toggleFavorite(currentTrack.id)}
              >
                <Heart 
                  size={28} 
                  className={isFavorite(currentTrack.id) ? "fill-primary text-primary" : "text-muted-foreground"} 
                />
              </button>
            </div>
            <p className="text-xl text-muted-foreground">{currentTrack.artist}</p>
            <p className="text-muted-foreground mt-1">{currentTrack.album}</p>
          </div>
          
          <div>
            <TrackProgress 
              currentTime={currentTime} 
              duration={currentTrack.duration}
              onSeek={handleSeek}
            />
            
            <div className="flex justify-between text-sm text-muted-foreground mb-6">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(currentTrack.duration)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-6">
            <button 
              className={`text-muted-foreground hover:text-foreground transition-colors ${shuffleActive ? "text-primary" : ""}`}
              onClick={toggleShuffle}
              aria-label="Toggle shuffle"
            >
              <Shuffle size={24} />
            </button>
            
            <button 
              className="text-foreground hover:text-primary transition-colors"
              onClick={handlePrevious}
              aria-label="Previous track"
            >
              <SkipBack size={36} />
            </button>
            
            <button 
              className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
              onClick={handlePlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
            </button>
            
            <button 
              className="text-foreground hover:text-primary transition-colors"
              onClick={handleNext}
              aria-label="Next track"
            >
              <SkipForward size={36} />
            </button>
            
            <button 
              className={`text-muted-foreground hover:text-foreground transition-colors ${repeatActive ? "text-primary" : ""}`}
              onClick={toggleRepeat}
              aria-label="Toggle repeat"
            >
              <Repeat size={24} />
            </button>
          </div>
          
          <div className="flex justify-center mt-4">
            <VolumeControl volume={volume} onVolumeChange={handleVolumeChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
