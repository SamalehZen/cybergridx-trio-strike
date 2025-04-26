import React, { useState, useEffect } from 'react';

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<'default' | 'neon'>('default');

  useEffect(() => {
    const body = document.body;
    if (theme === 'neon') {
      body.classList.add('neon');
      body.classList.remove('default');
    } else {
      body.classList.add('default');
      body.classList.remove('neon');
    }

    body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    return () => {
      body.style.transition = '';
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'default' ? 'neon' : 'default'));
  };

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