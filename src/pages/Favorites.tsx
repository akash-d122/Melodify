
import React from "react";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { Heart } from "lucide-react";
import { formatTime } from "@/utils/formatTime";

const Favorites: React.FC = () => {
  const { tracks, favorites, handleTrackSelect, toggleFavorite } = useMusicPlayer();
  
  const favoriteTracks = tracks.filter(track => favorites.includes(track.id));
  
  return (
    <div className="pb-16">
      <div className="flex flex-col mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Favorites</h1>
        <p className="text-muted-foreground">Your saved tracks</p>
      </div>
      
      {favoriteTracks.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="mx-auto mb-4 text-muted-foreground" size={48} strokeWidth={1.5} />
          <h2 className="text-xl font-medium mb-2">No favorites yet</h2>
          <p className="text-muted-foreground">
            Add songs to your favorites by clicking the heart icon.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Song</th>
                <th className="px-4 py-3 hidden md:table-cell">Album</th>
                <th className="px-4 py-3 text-right">Duration</th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {favoriteTracks.map((track, index) => (
                <tr 
                  key={track.id}
                  className="hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => handleTrackSelect(track.id)}
                >
                  <td className="px-4 py-3 text-muted-foreground">{index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={track.cover} 
                        alt={track.album} 
                        className="w-10 h-10 rounded object-cover" 
                      />
                      <div>
                        <div className="font-medium">{track.title}</div>
                        <div className="text-sm text-muted-foreground">{track.artist}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                    {track.album}
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">
                    {formatTime(track.duration)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="p-1.5 rounded-full hover:bg-primary/10 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(track.id);
                      }}
                    >
                      <Heart size={16} className="fill-primary text-primary" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Favorites;
