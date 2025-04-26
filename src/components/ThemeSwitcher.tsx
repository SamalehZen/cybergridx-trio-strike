import React, { useEffect, useState } from 'react';
import { useTheme } from "@/hooks/use-theme";
import { SunIcon } from "lucide-react"
import { MoonIcon } from "lucide-react"




const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme()
  const [theme, setCurrentTheme] = useState(resolvedTheme);

  useEffect(() => {
      setCurrentTheme(resolvedTheme)
  }, [resolvedTheme]);

  const toggleTheme = (theme : string) => {
    setTheme(theme);
  
   
  };


  return (
    <div className='theme-switcher-container'>
        <button 
        onClick={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}
        className="theme-switcher bg-primary hover:bg-primary/80 text-primary-foreground px-3 py-2 rounded-md transition-colors duration-300 ease-in-out"
        >
            {theme === "light" ? (
            <MoonIcon className="h-4 w-4" />
          ) : (
            <SunIcon className="h-4 w-4" />
          )}
        </button>
    </div>
  );
};

export default ThemeSwitcher;