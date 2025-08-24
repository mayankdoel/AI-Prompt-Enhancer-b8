"use client"

import type React from "react"

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  isOptional?: boolean
}

export const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChange,
  placeholder = "Enter your basic prompt here...",
  isOptional = false,
}) => {
  return (
    <div>
      <label htmlFor="prompt-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Your Prompt {isOptional && <span className="text-xs text-gray-500">(Optional)</span>}
      </label>
      <textarea
        id="prompt-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:border-primary-500 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 text-base"
        aria-label="Prompt Input"
      />
    </div>
  )
}
