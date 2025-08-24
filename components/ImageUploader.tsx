"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { UploadCloudIcon } from "./icons/UploadCloudIcon"
import { XIcon } from "./icons/XIcon"

interface ImageUploaderProps {
  onImageUpload: (file: { base64: string; mimeType: string; name: string } | null) => void
  uploadedImage: { base64: string; mimeType: string; name: string } | null
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, uploadedImage }) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = useCallback(
    (file: File | null) => {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = () => {
          const base64String = (reader.result as string).split(",")[1]
          onImageUpload({ base64: base64String, mimeType: file.type, name: file.name })
        }
        reader.readAsDataURL(file)
      }
    },
    [onImageUpload],
  )

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault() // Necessary to allow drop
  }
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  if (uploadedImage) {
    return (
      <div className="relative group">
        <img
          src={`data:${uploadedImage.mimeType};base64,${uploadedImage.base64}`}
          alt="Uploaded preview"
          className="w-full h-auto max-h-60 object-contain rounded-lg"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
          <button
            onClick={() => onImageUpload(null)}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            aria-label="Remove image"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <p className="text-xs text-center mt-1 text-gray-500 truncate">{uploadedImage.name}</p>
      </div>
    )
  }

  return (
    <div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300 ${isDragging ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-300 dark:border-gray-600"}`}
    >
      <input type="file" id="file-upload" className="sr-only" onChange={onFileChange} accept="image/*" />
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center gap-2">
        <UploadCloudIcon className="w-12 h-12 text-gray-400" />
        <p className="font-semibold text-gray-700 dark:text-gray-300">Drag & drop an image here</p>
        <p className="text-sm text-gray-500">
          or <span className="text-primary-500 font-medium">click to browse</span>
        </p>
      </label>
    </div>
  )
}
