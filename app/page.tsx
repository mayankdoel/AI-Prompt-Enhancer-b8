"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { ModeSelector } from "../components/ModeSelector"
import { PromptInput } from "../components/PromptInput"
import { ImageUploader } from "../components/ImageUploader"
import { ResultDisplay } from "../components/ResultDisplay"
import { SparklesIcon } from "../components/icons/SparklesIcon"
import { XIcon } from "../components/icons/XIcon"
import { enhanceTextPrompt, generatePromptFromImage } from "../services/geminiService"
import { AppMode } from "../types"
import { useTheme } from "../hooks/useTheme"

export default function App(): React.ReactNode {
  useTheme()
  const [mode, setMode] = useState<AppMode>(AppMode.TEXT)
  const [userInput, setUserInput] = useState<string>("")
  const [uploadedImage, setUploadedImage] = useState<{ base64: string; mimeType: string; name: string } | null>(null)
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const handleEnhancePrompt = useCallback(async () => {
    setIsLoading(true)
    setError("")
    setGeneratedPrompt("")

    try {
      let result: string
      if (mode === AppMode.TEXT) {
        if (!userInput.trim()) {
          setError("Please enter a prompt to enhance.")
          return
        }
        result = await enhanceTextPrompt(userInput)
      } else {
        if (!uploadedImage) {
          setError("Please upload an image to generate a prompt.")
          return
        }
        result = await generatePromptFromImage(userInput, uploadedImage.base64, uploadedImage.mimeType)
      }
      setGeneratedPrompt(result)
    } catch (err) {
      console.error("AI generation failed:", err)
      setError("Failed to generate the prompt. Please check your API key and try again.")
      setGeneratedPrompt(
        "Fallback: The AI service is currently unavailable. Here is a sample enhanced prompt:\n\n**Objective:** Create a photorealistic image of a majestic lion.\n\n**Details:**\n- **Subject:** A male African lion with a full, dark mane.\n- **Setting:** Serengeti plains during a golden hour sunset.\n- **Action:** The lion is roaring, its head tilted slightly upwards.\n- **Style:** National Geographic-style photography, sharp focus, high detail.",
      )
    } finally {
      setIsLoading(false)
    }
  }, [mode, userInput, uploadedImage])

  const handleClear = useCallback(() => {
    setUserInput("")
    setUploadedImage(null)
    setGeneratedPrompt("")
    setError("")
  }, [])

  return (
    <div className="bg-gray-100 dark:bg-gray-700 min-h-screen flex flex-col font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          <ModeSelector mode={mode} setMode={setMode} />

          <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm p-6 space-y-4 transition-all duration-300">
            {mode === AppMode.TEXT ? (
              <PromptInput value={userInput} onChange={setUserInput} />
            ) : (
              <div className="space-y-4">
                <ImageUploader onImageUpload={setUploadedImage} uploadedImage={uploadedImage} />
                <PromptInput
                  value={userInput}
                  onChange={setUserInput}
                  placeholder="Add optional instructions for the image..."
                  isOptional={true}
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleClear}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800"
              >
                <XIcon className="w-4 h-4" />
                Clear
              </button>
              <button
                onClick={handleEnhancePrompt}
                disabled={isLoading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900 transform hover:scale-105 transition-all duration-200 disabled:bg-primary-400 disabled:cursor-not-allowed disabled:scale-100 group"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <SparklesIcon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                )}
                <span>{isLoading ? "Enhancing..." : "Enhance Prompt"}</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-500 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 rounded-lg p-3 text-center">
              {error}
            </div>
          )}

          <ResultDisplay prompt={generatedPrompt} isLoading={isLoading} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
