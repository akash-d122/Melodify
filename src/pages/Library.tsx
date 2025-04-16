
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { Heart } from "lucide-react";

const Library: React.FC = () => {
  const { tracks, handleTrackSelect, toggleFavorite, isFavorite } = useMusicPlayer();
  const [activeTab, setActiveTab] = useState("songs");
  
  // Extract unique albums and artists
  const albums = Array.from(new Set(tracks.map(track => track.album)))
    .map(album => ({
      name: album,
      cover: tracks.find(track => track.album === album)?.cover || '',
      artist: tracks.find(track => track.album === album)?.artist || '',
      trackCount: tracks.filter(track => track.album === album).length
    }));
  
  const artists = Array.from(new Set(tracks.map(track => track.artist)))
    .map(artist => ({
      name: artist,
      tracks: tracks.filter(track => track.artist === artist)
    }));
  
  return (
    <div className="pb-16">
      <div className="flex flex-col mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Library</h1>
        <p className="text-muted-foreground">Browse your music collection</p>
      </div>
      
      <Tabs defaultValue="songs" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="songs">Songs</TabsTrigger>
          <TabsTrigger value="albums">Albums</TabsTrigger>
          <TabsTrigger value="artists">Artists</TabsTrigger>
        </TabsList>
        
        <TabsContent value="songs" className="space-y-4">
          <div className="grid grid-cols-1 gap-2">
            {tracks.map(track => (
              <div 
                key={track.id}
                className="flex items-center justify-between p-3 rounded-md hover:bg-secondary transition-colors cursor-pointer"
                onClick={() => handleTrackSelect(track.id)}
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={track.cover} 
                    alt={track.album} 
                    className="w-12 h-12 object-cover rounded-md" 
                  />
                  <div>
                    <div className="font-medium">{track.title}</div>
                    <div className="text-sm text-muted-foreground">{track.artist}</div>
                  </div>
                </div>
                
                <button
                  className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(track.id);
                  }}
                >
                  <Heart 
                    size={18} 
                    className={isFavorite(track.id) ? "fill-primary text-primary" : "text-muted-foreground"} 
                  />
                </button>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="albums" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {albums.map(album => (
              <div 
                key={album.name}
                className="flex flex-col gap-2 group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden rounded-md group-hover:shadow-lg transition-all">
                  <img 
                    src={album.cover} 
                    alt={album.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium">{album.trackCount} tracks</span>
                  </div>
                </div>
                <div>
                  <div className="font-medium truncate">{album.name}</div>
                  <div className="text-sm text-muted-foreground truncate">{album.artist}</div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="artists" className="space-y-8">
          {artists.map(artist => (
            <div key={artist.name} className="space-y-3">
              <h3 className="text-xl font-bold">{artist.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {artist.tracks.map(track => (
                  <div 
                    key={track.id}
                    className="flex flex-col gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleTrackSelect(track.id)}
                  >
                    <img 
                      src={track.cover} 
                      alt={track.album}
                      className="aspect-square object-cover rounded-md shadow-md" 
                    />
                    <div className="text-sm font-medium truncate">{track.title}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Library;
