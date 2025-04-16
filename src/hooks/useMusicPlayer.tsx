
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { tracks, Track } from "@/data/tracks";
import { toast } from "@/components/ui/sonner";

interface MusicPlayerContextType {
  tracks: Track[];
  currentTrack: Track | null;
  currentTrackId: number;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  shuffleActive: boolean;
  repeatActive: boolean;
  favorites: number[];
  handlePlayPause: () => void;
  handleNext: () => void;
  handlePrevious: () => void;
  handleTrackSelect: (id: number) => void;
  handleSeek: (time: number) => void;
  handleVolumeChange: (volume: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrackId, setCurrentTrackId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [shuffleActive, setShuffleActive] = useState(false);
  const [repeatActive, setRepeatActive] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = tracks.find(track => track.id === currentTrackId) || null;
  
  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };
    
    const handleEnded = () => {
      if (repeatActive) {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
      } else {
        handleNext();
      }
    };
    
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('ended', handleEnded);
    
    // Load initial track
    if (currentTrack) {
      audioRef.current.src = currentTrack.audioSrc;
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
      }
    };
  }, []);
  
  // Update audio source when current track changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audioSrc;
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Audio playback error:", error);
        });
      }
    }
  }, [currentTrackId, currentTrack]);
  
  // Handle play/pause state changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Audio playback error:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);
  
  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Error parsing favorites from localStorage:", e);
      }
    }
  }, []);
  
  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    
    if (!isPlaying && currentTrack) {
      toast("Now playing", {
        description: `${currentTrack.title} by ${currentTrack.artist}`,
        duration: 3000,
      });
    }
  };
  
  const handleNext = () => {
    if (shuffleActive) {
      // Get a random track different from current one
      const availableTracks = tracks.filter(track => track.id !== currentTrackId);
      const randomTrack = availableTracks[Math.floor(Math.random() * availableTracks.length)];
      setCurrentTrackId(randomTrack.id);
    } else {
      // Get next track or loop to first
      const currentIndex = tracks.findIndex(track => track.id === currentTrackId);
      const nextIndex = (currentIndex + 1) % tracks.length;
      setCurrentTrackId(tracks[nextIndex].id);
    }
    
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };
  
  const handlePrevious = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrackId);
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = tracks.length - 1;
    setCurrentTrackId(tracks[prevIndex].id);
    
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };
  
  const handleTrackSelect = (id: number) => {
    setCurrentTrackId(id);
    setIsPlaying(true);
  };
  
  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };
  
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };
  
  const toggleShuffle = () => {
    setShuffleActive(!shuffleActive);
    toast(shuffleActive ? "Shuffle disabled" : "Shuffle enabled");
  };
  
  const toggleRepeat = () => {
    setRepeatActive(!repeatActive);
    toast(repeatActive ? "Repeat disabled" : "Repeat enabled");
  };
  
  const toggleFavorite = (id: number) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(id)) {
        toast("Removed from favorites");
        return prevFavorites.filter(favId => favId !== id);
      } else {
        const track = tracks.find(t => t.id === id);
        if (track) {
          toast(`Added to favorites`, {
            description: `${track.title} by ${track.artist}`,
          });
        }
        return [...prevFavorites, id];
      }
    });
  };
  
  const isFavorite = (id: number) => favorites.includes(id);
  
  const value = {
    tracks,
    currentTrack,
    currentTrackId,
    isPlaying,
    currentTime,
    volume,
    shuffleActive,
    repeatActive,
    favorites,
    handlePlayPause,
    handleNext,
    handlePrevious,
    handleTrackSelect,
    handleSeek,
    handleVolumeChange,
    toggleShuffle,
    toggleRepeat,
    toggleFavorite,
    isFavorite
  };
  
  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};
