import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import NowPlaying from "./pages/NowPlaying";
import NotFound from "./pages/NotFound";
import { MusicPlayerProvider } from "./hooks/useMusicPlayer";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MusicPlayerProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="library" element={<Library />} />
                <Route path="search" element={<Search />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="/now-playing" element={<NowPlaying />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </MusicPlayerProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
