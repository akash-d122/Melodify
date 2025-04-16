
import React from "react";
import { Track } from "@/data/tracks";
import PlaylistItem from "./PlaylistItem";

interface PlaylistProps {
  tracks: Track[];
  currentTrackId: number;
  isPlaying: boolean;
  onTrackSelect: (id: number) => void;
}

const Playlist: React.FC<PlaylistProps> = ({
  tracks,
  currentTrackId,
  isPlaying,
  onTrackSelect,
}) => {
  return (
    <div className="w-full rounded-2xl bg-card p-6">
      <h2 className="text-xl font-bold mb-4">Playlist</h2>
      
      <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto pr-2">
        {tracks.map((track) => (
          <PlaylistItem 
            key={track.id}
            track={track}
            isActive={track.id === currentTrackId}
            isPlaying={track.id === currentTrackId && isPlaying}
            onSelect={() => onTrackSelect(track.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
