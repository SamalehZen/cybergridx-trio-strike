import React, { useEffect } from 'react';

interface ThemeSwitcherProps {
  theme: 'default' | 'neon' | 'cyber';
  onThemeChange: (theme: 'default' | 'neon' | 'cyber') => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, onThemeChange }: ThemeSwitcherProps) => {
  const toggleTheme = () => {
    onThemeChange(theme === 'default' ? 'neon' : theme === 'neon' ? 'cyber' : 'default');
  };

  useEffect(() => {}, [theme]);

  return (
    <button 
      onClick={toggleTheme}
      className="bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-2 rounded-md transition-colors duration-300 ease-in-out"
    >
      {theme === 'default' ? 'Switch to Neon Theme' : 'Switch to Default Theme'}
    </button>
  );
};

export default ThemeSwitcher;