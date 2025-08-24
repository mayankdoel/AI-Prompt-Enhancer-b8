import { useEffect } from 'react';
import { Theme } from '../types';

export const useTheme = (): void => {
  useEffect(() => {
    const applyTheme = (theme: Theme) => {
      if (theme === Theme.DARK) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    const savedTheme = localStorage.getItem('theme') as Theme | null;

    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? Theme.DARK : Theme.LIGHT);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? Theme.DARK : Theme.LIGHT);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
};
