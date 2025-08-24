import React from 'react';
import { AppMode } from '../types';

interface ModeSelectorProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

const baseClasses = "flex-1 text-center font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800";
const activeClasses = "bg-primary-500 text-white shadow-md scale-105";
const inactiveClasses = "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600";

export const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, setMode }) => {
  return (
    <div className="flex w-full max-w-sm mx-auto p-1 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-inner">
      <button
        onClick={() => setMode(AppMode.TEXT)}
        className={`${baseClasses} ${mode === AppMode.TEXT ? activeClasses : inactiveClasses}`}
        aria-pressed={mode === AppMode.TEXT}
      >
        Text Prompt
      </button>
      <button
        onClick={() => setMode(AppMode.IMAGE)}
        className={`${baseClasses} ${mode === AppMode.IMAGE ? activeClasses : inactiveClasses}`}
        aria-pressed={mode === AppMode.IMAGE}
      >
        Image Prompt
      </button>
    </div>
  );
};
