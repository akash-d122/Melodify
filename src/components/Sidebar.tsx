import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Library, Search, Heart, Settings, Bot, Music2 } from "lucide-react";
import MusicVisualizer from "./MusicVisualizer";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { motion } from "framer-motion";

const Sidebar: React.FC = () => {
  const { isPlaying } = useMusicPlayer();

  return (
    <motion.div 
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-16 sm:w-20 md:w-64 h-screen fixed left-0 flex flex-col bg-gradient-to-b from-background/40 via-primary/5 to-background/40 backdrop-blur-xl border-r border-white/10 shadow-lg shadow-black/5 dark:shadow-white/5"
    >
      <div className="p-2 sm:p-3 md:p-4 flex flex-col items-center justify-center mb-4 sm:mb-6">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-background/40 backdrop-blur-xl border border-white/20 flex items-center justify-center relative overflow-hidden group shadow-lg shadow-primary/20 dark:shadow-primary/10"
        >
          <MusicVisualizer isPlaying={isPlaying} />
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            animate={{ 
              scale: isPlaying ? [1, 1.1, 1] : 1,
              rotate: isPlaying ? [0, 180] : 0 
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 backdrop-blur-xl border border-white/10" />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Music2 className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
          </div>
        </motion.div>
        
        <div className="hidden sm:flex flex-col items-center mt-2">
          <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-foreground via-primary/80 to-foreground bg-clip-text text-transparent">
            AI Music
          </span>
          <span className="text-[10px] sm:text-xs text-muted-foreground/60">Assistant</span>
        </div>
      </div>
      
      <nav className="flex-grow">
        <ul className="space-y-1 sm:space-y-2 px-2">
          {[
            { to: "/", label: "Home", icon: <Home size={16} className="sm:w-5 sm:h-5" /> },
            { to: "/library", label: "Library", icon: <Library size={16} className="sm:w-5 sm:h-5" /> },
            { to: "/search", label: "Search", icon: <Search size={16} className="sm:w-5 sm:h-5" /> },
            { to: "/favorites", label: "Favorites", icon: <Heart size={16} className="sm:w-5 sm:h-5" /> },
            { to: "/settings", label: "Settings", icon: <Settings size={16} className="sm:w-5 sm:h-5" /> },
          ].map((item) => (
            <motion.li 
              key={item.to}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) => 
                  `flex items-center gap-2 p-2 sm:p-3 rounded-md transition-colors ${
                    isActive 
                      ? "bg-gradient-to-r from-primary/20 to-background/40 text-primary backdrop-blur-xl border border-white/20 shadow-lg shadow-primary/10" 
                      : "hover:bg-gradient-to-r hover:from-background/40 hover:to-background/20 backdrop-blur-xl border border-white/10 hover:border-white/20"
                  }`
                }
              >
                {item.icon}
                <span className="hidden md:block text-sm">{item.label}</span>
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </nav>
      
      <div className="p-2 sm:p-3 md:p-4 hidden sm:block">
        <div className="text-xs sm:text-sm text-muted-foreground/80 bg-gradient-to-br from-background/40 to-primary/5 backdrop-blur-xl border border-white/10 rounded-md p-2 sm:p-3 shadow-lg shadow-black/5">
          <p className="flex items-center gap-2">
            <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              AI Music Assistant
            </span>
          </p>
          <p className="text-[10px] sm:text-xs mt-1 text-muted-foreground/60">Powered by AI</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
