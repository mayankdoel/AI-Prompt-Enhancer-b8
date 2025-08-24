import React from 'react';
import { IndianFlag } from './IndianFlag';

export const Footer = (): React.ReactNode => {
    const email = 'mahi6463763@gmail.com';
    const subject = 'Suggestion for AI Prompt Enhancer';
    const body = 'Hello Mayank,\n\nI have a suggestion for your AI Prompt Enhancer application:\n\n';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <footer className="w-full text-center p-4 bg-white/50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-400">
        <span>© 2025 MAYANK</span>
        <div className="flex items-center gap-2">
            Developed with <span className="text-red-500">❤</span> in <IndianFlag /> INDIA
        </div>
        <a href={mailtoLink} className="hover:text-primary-500 underline transition-colors">
            Contact for Suggestions
        </a>
      </div>
    </footer>
  );
};
