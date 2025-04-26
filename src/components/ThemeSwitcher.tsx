import React, { useEffect, useState } from 'react';
import { useTheme } from "@/hooks/use-theme";




const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme()
  const [theme, setCurrentTheme] = useState(resolvedTheme);

  useEffect(() => {
      setCurrentTheme(resolvedTheme)
  }, [resolvedTheme]);

  const toggleTheme = (theme : string) => {
    setTheme(theme);
  
    document.body.classList.remove('default', 'neon', 'cyber');
    document.body.classList.add(theme);
  };

  const getThemeLabel = () => {
    if (theme === 'default') return 'Switch to Neon Theme';
    if (theme === 'neon') return 'Switch to Cyber Theme';
    if (theme === 'cyber') return 'Switch to Default Theme';
    return 'Switch Theme'
  };

  return (
    <div className='theme-switcher-container'>
        <button 
        onClick={() => toggleTheme(theme === 'default' ? 'neon' : theme === 'neon' ? 'cyber' : 'default')}
        className="theme-switcher bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-2 rounded-md transition-colors duration-300 ease-in-out"
        >
        {getThemeLabel()}
        </button>
    </div>
  );
};

export default ThemeSwitcher;