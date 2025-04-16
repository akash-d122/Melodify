
import React, { useState, useEffect, useRef } from "react";
import { formatTime } from "@/utils/formatTime";

interface TrackProgressProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const TrackProgress: React.FC<TrackProgressProps> = ({ 
  currentTime, 
  duration, 
  onSeek 
}) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState<number | null>(null);
  
  // Calculate the progress percentage
  const progressPercentage = duration > 0 
    ? (dragPosition !== null 
      ? (dragPosition / duration) * 100 
      : (currentTime / duration) * 100)
    : 0;
    
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      onSeek(clickPosition * duration);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      setDragPosition(clickPosition * duration);
    }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const movePosition = (e.clientX - rect.left) / rect.width;
      const clampedPosition = Math.max(0, Math.min(1, movePosition));
      setDragPosition(clampedPosition * duration);
    }
  };

  const handleMouseUp = () => {
    if (isDragging && dragPosition !== null) {
      onSeek(dragPosition);
      setIsDragging(false);
      setDragPosition(null);
    }
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Cleanup event listeners when component unmounts
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  
  return (
    <div className="w-full flex flex-col gap-1">
      <div 
        ref={progressBarRef}
        className="h-2 bg-secondary rounded-full cursor-pointer relative group"
        onClick={handleProgressClick}
        onMouseDown={handleMouseDown}
      >
        <div 
          className="absolute h-2 bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
        <div 
          className={`absolute h-4 w-4 bg-primary rounded-full -top-1 shadow-md transition-all duration-300 ease-out scale-90 group-hover:scale-100 ${isDragging ? "scale-110" : ""}`}
          style={{ left: `calc(${progressPercentage}% - 8px)` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <div>{formatTime(dragPosition !== null ? dragPosition : currentTime)}</div>
        <div>{formatTime(duration)}</div>
      </div>
    </div>
  );
};

export default TrackProgress;
