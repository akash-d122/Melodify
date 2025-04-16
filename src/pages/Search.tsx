
import React, { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";

const Search: React.FC = () => {
  const { tracks, handleTrackSelect } = useMusicPlayer();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(tracks);
  
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults(tracks);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = tracks.filter(track => 
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query) ||
      track.album.toLowerCase().includes(query)
    );
    
    setResults(filtered);
  }, [searchQuery, tracks]);
  
  return (
    <div className="pb-16">
      <div className="flex flex-col mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Search</h1>
        <p className="text-muted-foreground">Find your favorite music</p>
      </div>
      
      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          type="search"
          placeholder="Search by song, artist, or album..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
      </div>
      
      <div>
        {results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No results found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map(track => (
              <div 
                key={track.id}
                className="flex items-center gap-4 p-3 rounded-md hover:bg-secondary transition-colors cursor-pointer"
                onClick={() => handleTrackSelect(track.id)}
                style={{ borderLeft: `4px solid ${track.color}` }}
              >
                <img 
                  src={track.cover} 
                  alt={track.album} 
                  className="w-14 h-14 object-cover rounded-md shadow-sm" 
                />
                <div>
                  <div className="font-medium">{track.title}</div>
                  <div className="text-sm text-muted-foreground">{track.artist} • {track.album}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
