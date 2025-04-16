
import React from "react";

interface MusicVisualizerProps {
  isPlaying: boolean;
}

const MusicVisualizer: React.FC<MusicVisualizerProps> = ({ isPlaying }) => {
  const bars = 5;
  
  return (
    <div className={`visualizer-container flex items-end gap-1 h-12 ${isPlaying ? "opacity-100" : "opacity-40"}`}>
      {[...Array(bars)].map((_, i) => (
        <div 
          key={i}
          className={`visualizer-bar bg-primary w-1 rounded-t-sm ${
            isPlaying ? `animate-visualizer-${i + 1}` : "h-1"
          }`}
          style={{
            animationDuration: isPlaying ? `${0.8 + i * 0.2}s` : "0s",
            animationDelay: isPlaying ? `${i * 0.1}s` : "0s",
            height: isPlaying ? undefined : "2px"
          }}
        />
      ))}
    </div>
  );
};

export default MusicVisualizer;
