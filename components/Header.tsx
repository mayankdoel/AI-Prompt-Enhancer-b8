import type React from "react"
import { SparklesIcon } from "./icons/SparklesIcon"

export const Header = (): React.ReactNode => {
  return (
    <header className="w-full p-4 flex justify-between items-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <SparklesIcon className="w-8 h-8 text-primary-500" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">AI Prompt Enhancer</h1>
      </div>
    </header>
  )
}
