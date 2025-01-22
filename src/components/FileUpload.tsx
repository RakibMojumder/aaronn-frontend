"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  acceptedTypes: string[];
  maxSizeMB: number;
  onUpload: (file: File) => void;
  onRemoveFile: () => void;
  label: string;
  fileTypeDescription: string;
  className?: string;
  currentImage?: string;
}

export function FileUpload({
  acceptedTypes,
  maxSizeMB,
  onUpload,
  onRemoveFile,
  label,
  fileTypeDescription,
  className,
  currentImage,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    if (!acceptedTypes.includes(file.type)) {
      setError("Invalid file type.");
      return false;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size should be less than ${maxSizeMB}MB`);
      return false;
    }
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      handleFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
      onUpload(file);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreviewImage(null);
    onRemoveFile();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="bg-neutral-900 rounded-lg shadow-sm p-6">
        <h2 className="font-medium mb-4">{label}</h2>
        <div
          className={`relative border-2 border-neutral-700 border-dashed rounded-lg p-6 ${
            isDragging ? "border-primary bg-blue-50" : "border-gray-300"
          } transition-colors duration-200`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            accept={acceptedTypes.join(",")}
            className="hidden"
            id="file-upload"
          />

          <AnimatePresence>
            {!previewImage ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center gap-2"
              >
                <ImageIcon className="w-12 h-12 text-primary" />
                <p className="text-center">
                  Drag & Drop <br />
                  or{" "}
                  <label
                    htmlFor="file-upload"
                    className="text-primary cursor-pointer"
                  >
                    browse
                  </label>
                </p>
                <p className="text-sm text-gray-500">{fileTypeDescription}</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative aspect-video w-full"
              >
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain rounded-lg"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-white text-black rounded-full shadow-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 mt-2 text-sm"
          >
            {error}
          </motion.p>
        )}
      </div>

      {currentImage && !previewImage && (
        <div className="relative">
          <Image
            src={currentImage}
            alt="Current project"
            width={500}
            height={500}
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            onClick={onRemoveFile}
            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
