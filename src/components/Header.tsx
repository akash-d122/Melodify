import React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon, LogIn, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";

const Header: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 right-0 left-16 md:left-64 p-4 z-50 flex items-center justify-between bg-gradient-to-r from-background/40 via-primary/5 to-background/40 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/5 dark:shadow-white/5 transition-all duration-300"
    >
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gradient-to-br from-primary/20 to-background/40 backdrop-blur-xl border border-white/20 shadow-lg shadow-primary/20 dark:shadow-primary/10 transition-all duration-300"
          >
            <img 
              src="/logo.svg" 
              alt="Melodify Logo" 
              className="h-5 w-5 text-foreground/80 group-hover:text-foreground transition-colors" 
            />
          </motion.div>
          <div className="flex items-center gap-2">
            <motion.h1 
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold bg-gradient-to-r from-foreground via-primary/80 to-foreground bg-clip-text text-transparent"
            >
              Melodify
            </motion.h1>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xs text-muted-foreground/60 bg-gradient-to-r from-muted-foreground/60 to-muted-foreground/40 bg-clip-text"
            >
              Music Player
            </motion.span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 relative overflow-hidden bg-gradient-to-br from-background/40 to-primary/5 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/5 dark:shadow-white/5 transition-all duration-300 hover:shadow-primary/20"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={resolvedTheme}
                initial={{ y: -20, opacity: 0, rotate: -180 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 20, opacity: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-5 w-5 text-foreground/80" />
                ) : (
                  <Moon className="h-5 w-5 text-foreground/80" />
                )}
              </motion.div>
            </AnimatePresence>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="default" 
            className="gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 backdrop-blur-xl border border-white/20 shadow-lg shadow-primary/20 dark:shadow-primary/10 transition-all duration-300"
          >
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <LogIn className="h-4 w-4" />
            </motion.div>
            <motion.span
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Sign In
            </motion.span>
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header; 