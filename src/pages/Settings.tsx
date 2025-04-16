
import React, { useState, useEffect } from "react";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun, Volume2, Music2, Keyboard } from "lucide-react";

const Settings: React.FC = () => {
  const { volume, handleVolumeChange } = useMusicPlayer();
  
  // These settings would connect to a real settings context in a production app
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [autoPlay, setAutoPlay] = useState(true);
  const [normalizeVolume, setNormalizeVolume] = useState(false);
  const [highQualityStreaming, setHighQualityStreaming] = useState(false);
  const [keyboardShortcuts, setKeyboardShortcuts] = useState(true);
  
  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);
  
  const applyTheme = (selectedTheme: "light" | "dark" | "system") => {
    const root = window.document.documentElement;
    
    if (selectedTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.remove("light", "dark");
      root.classList.add(systemTheme);
    } else {
      root.classList.remove("light", "dark");
      root.classList.add(selectedTheme);
    }
    
    localStorage.setItem("theme", selectedTheme);
  };
  
  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };
  
  return (
    <div className="pb-16 max-w-2xl">
      <div className="flex flex-col mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Customize your experience</p>
      </div>
      
      <div className="space-y-8">
        {/* Theme Settings */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Sun size={20} className="text-primary" />
            Appearance
          </h2>
          
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="theme">Theme</Label>
              <RadioGroup id="theme" value={theme} onValueChange={(value) => handleThemeChange(value as any)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light">Light</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark">Dark</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system">System</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        
        {/* Audio Settings */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Volume2 size={20} className="text-primary" />
            Audio
          </h2>
          
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="normalize">Normalize Volume</Label>
                <p className="text-sm text-muted-foreground">Maintain consistent volume across tracks</p>
              </div>
              <Switch
                id="normalize"
                checked={normalizeVolume}
                onCheckedChange={setNormalizeVolume}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="high-quality">High Quality Streaming</Label>
                <p className="text-sm text-muted-foreground">Uses more data but sounds better</p>
              </div>
              <Switch
                id="high-quality"
                checked={highQualityStreaming}
                onCheckedChange={setHighQualityStreaming}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="default-volume">Default Volume</Label>
              <div className="w-32">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Playback Settings */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Music2 size={20} className="text-primary" />
            Playback
          </h2>
          
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoplay">Autoplay</Label>
                <p className="text-sm text-muted-foreground">Automatically play songs when selected</p>
              </div>
              <Switch
                id="autoplay"
                checked={autoPlay}
                onCheckedChange={setAutoPlay}
              />
            </div>
          </div>
        </div>
        
        {/* Keyboard Shortcuts */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Keyboard size={20} className="text-primary" />
            Keyboard Shortcuts
          </h2>
          
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="keyboard">Enable Keyboard Shortcuts</Label>
                <p className="text-sm text-muted-foreground">Control playback with keyboard</p>
              </div>
              <Switch
                id="keyboard"
                checked={keyboardShortcuts}
                onCheckedChange={setKeyboardShortcuts}
              />
            </div>
            
            {keyboardShortcuts && (
              <div className="pt-2 space-y-2">
                <p className="text-sm font-medium">Available shortcuts:</p>
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-2">Space</td>
                      <td className="py-2 text-muted-foreground">Play / Pause</td>
                    </tr>
                    <tr>
                      <td className="py-2">Right Arrow</td>
                      <td className="py-2 text-muted-foreground">Next Track</td>
                    </tr>
                    <tr>
                      <td className="py-2">Left Arrow</td>
                      <td className="py-2 text-muted-foreground">Previous Track</td>
                    </tr>
                    <tr>
                      <td className="py-2">Up Arrow</td>
                      <td className="py-2 text-muted-foreground">Volume Up</td>
                    </tr>
                    <tr>
                      <td className="py-2">Down Arrow</td>
                      <td className="py-2 text-muted-foreground">Volume Down</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
