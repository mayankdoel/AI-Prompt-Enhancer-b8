"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { CopyIcon } from "./icons/CopyIcon"
import { HeartIcon } from "./icons/HeartIcon"
import { CommentIcon } from "./icons/CommentIcon"
import { RetweetIcon } from "./icons/RetweetIcon"
import type { StructuredPrompt, PromptSection } from "../types"

interface ResultDisplayProps {
  prompt: string
  isLoading: boolean
}

const sectionColors: { [key: string]: string } = {
  Role: "bg-blue-500",
  Task: "bg-red-500",
  Context: "bg-green-500",
  Reasoning: "bg-purple-500",
  "Output Format": "bg-pink-400",
  Constraints: "bg-sky-500",
  Subject: "bg-blue-500",
  Style: "bg-teal-500",
  Composition: "bg-amber-500",
  Lighting: "bg-yellow-400",
  "Color Palette": "bg-indigo-500",
  "Negative Prompt": "bg-slate-500",
  DEFAULT: "bg-gray-400",
}

const PromptSectionDisplay: React.FC<{ section: PromptSection }> = ({ section }) => {
  const color = Object.keys(sectionColors).find((key) => section.title.toLowerCase().includes(key.toLowerCase()))
    ? sectionColors[Object.keys(sectionColors).find((key) => section.title.toLowerCase().includes(key.toLowerCase()))!]
    : sectionColors.DEFAULT

  return (
    <div className="flex gap-4 items-start">
      <div className={`w-1 flex-shrink-0 self-stretch rounded-full ${color}`}></div>
      <div className="flex-grow">
        <h4 className="font-bold text-gray-800 dark:text-white">{section.title}</h4>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans text-base leading-relaxed mt-1">
          {section.content}
        </p>
      </div>
    </div>
  )
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ prompt, isLoading }) => {
  const [isCopied, setIsCopied] = useState(false)
  const [structuredPrompt, setStructuredPrompt] = useState<StructuredPrompt | null>(null)

  useEffect(() => {
    if (prompt) {
      try {
        // Clean the string in case the AI returns it wrapped in markdown \`\`\`json ... \`\`\`
        const cleanedPrompt = prompt.replace(/^```json\n|```$/g, "").trim()
        const parsed = JSON.parse(cleanedPrompt)
        if (Array.isArray(parsed) && parsed.every((item) => "title" in item && "content" in item)) {
          setStructuredPrompt(parsed)
        } else {
          throw new Error("Invalid structure")
        }
      } catch (e) {
        setStructuredPrompt([{ title: "Enhanced Prompt", content: prompt }])
      }
    } else {
      setStructuredPrompt(null)
    }
  }, [prompt])

  const wordCount = useMemo(() => {
    if (!structuredPrompt) return 0
    return structuredPrompt.reduce((acc, section) => {
      const words = section.content ? section.content.trim().split(/\s+/) : []
      return acc + (words[0] === "" ? 0 : words.length)
    }, 0)
  }, [structuredPrompt])

  const handleCopy = () => {
    if (!structuredPrompt) return
    const textToCopy = structuredPrompt.map((section) => `## ${section.title}\n\n${section.content}`).join("\n\n")
    navigator.clipboard.writeText(textToCopy)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="w-full bg-white dark:bg-gray-800/50 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      </div>
    )
  }

  if (!structuredPrompt) {
    return null
  }

  return (
    <div className="w-full bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 p-1 rounded-xl shadow-2xl">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Enhanced Prompt</h3>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">{wordCount} words</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
            >
              <CopyIcon className="w-4 h-4" />
              <span>{isCopied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {structuredPrompt.map((section, index) => (
            <PromptSectionDisplay key={index} section={section} />
          ))}
        </div>

        <div className="flex items-center gap-6 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500">
          <HeartIcon className="w-6 h-6 hover:text-red-500 transition-colors cursor-pointer" />
          <CommentIcon className="w-6 h-6 hover:text-blue-500 transition-colors cursor-pointer" />
          <RetweetIcon className="w-6 h-6 hover:text-green-500 transition-colors cursor-pointer" />
        </div>
      </div>
    </div>
  )
}
