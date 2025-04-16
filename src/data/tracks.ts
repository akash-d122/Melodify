
export interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  audioSrc: string;
  color: string;
}

export const tracks: Track[] = [
  {
    id: 1,
    title: "Electric Dreams",
    artist: "Synthwave Collective",
    album: "Neon Horizons",
    duration: 237, // 3:57
    cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=1000",
    audioSrc: "/audio-samples/sample1.mp3", // This would be a real audio file path in a real app
    color: "#8B5CF6"
  },
  {
    id: 2,
    title: "Midnight Drive",
    artist: "Urban Echoes",
    album: "City Lights",
    duration: 184, // 3:04
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000",
    audioSrc: "/audio-samples/sample2.mp3",
    color: "#EC4899"
  },
  {
    id: 3,
    title: "Celestial Journey",
    artist: "Astral Harmony",
    album: "Cosmic Waves",
    duration: 214, // 3:34
    cover: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1000",
    audioSrc: "/audio-samples/sample3.mp3",
    color: "#3B82F6"
  },
  {
    id: 4,
    title: "Desert Mirage",
    artist: "Oasis Sound",
    album: "Wanderlust",
    duration: 198, // 3:18
    cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000",
    audioSrc: "/audio-samples/sample4.mp3",
    color: "#F59E0B"
  },
  {
    id: 5,
    title: "Rainy Day Melancholy",
    artist: "Ambient Thoughts",
    album: "Weather Patterns",
    duration: 245, // 4:05
    cover: "https://images.unsplash.com/photo-1470432581262-e7880e8fe79a?q=80&w=1000",
    audioSrc: "/audio-samples/sample5.mp3",
    color: "#10B981"
  },
  {
    id: 6,
    title: "Urban Jungle",
    artist: "Metro Beats",
    album: "City Tales",
    duration: 221, // 3:41
    cover: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1000",
    audioSrc: "/audio-samples/sample6.mp3",
    color: "#6366F1"
  },
  {
    id: 7,
    title: "Ocean Breeze",
    artist: "Coastal Dreams",
    album: "Seaside Sessions",
    duration: 193, // 3:13
    cover: "https://images.unsplash.com/photo-1518802508264-76256089cddb?q=80&w=1000",
    audioSrc: "/audio-samples/sample7.mp3",
    color: "#0EA5E9"
  },
  {
    id: 8,
    title: "Mountain Echo",
    artist: "Alpine Soundscapes",
    album: "Peak Experience",
    duration: 227, // 3:47
    cover: "https://images.unsplash.com/photo-1433162653888-a571db5ccccf?q=80&w=1000",
    audioSrc: "/audio-samples/sample8.mp3",
    color: "#84CC16"
  }
];
