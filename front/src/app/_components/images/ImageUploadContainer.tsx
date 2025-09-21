'use client';

import * as React from 'react';
import { useState, useCallback } from 'react';
import type { PromptImage } from '@/__generated__/graphql';
import { useUploadImage } from '@/app/_hooks/useUploadImage';
import ImageDropOverlay from './ImageDropOverlay';
import ImageSlots from './ImageSlots';

interface ImageUploadContainerProps {
  onImagesChange: (images: PromptImage[]) => void;
  maxImages?: number;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function ImageUploadContainer({
  onImagesChange,
  maxImages = 3,
  disabled = false,
  className = '',
  children = undefined,
}: ImageUploadContainerProps) {
  const [images, setImages] = useState<PromptImage[]>([]);
  const [uploadsInProgress, setUploadsInProgress] = useState<number>(0);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);

  const { upload } = useUploadImage({
    onError: (error) => {
      setUploadErrors((prev) => [...prev, error.message || 'Upload failed']);
    },
  });

  const handleFileSelect = useCallback(async (files: File[]) => {
    setUploadErrors([]);
    setUploadsInProgress(files.length);

    const uploadPromises = files.map(async (file) => {
      try {
        const uploadedImage = await upload(file);
        if (uploadedImage) {
          setImages((prev) => {
            const newImages = [...prev, uploadedImage];
            onImagesChange(newImages);
            return newImages;
          });
        }
      } catch (error) {
        // Error handled by hook
      } finally {
        setUploadsInProgress((prev) => prev - 1);
      }
    });

    await Promise.all(uploadPromises);
  }, [upload, onImagesChange]);

  const handleRemoveImage = useCallback((imageId: string) => {
    setImages((prev) => {
      const newImages = prev.filter((img) => img.id !== imageId);
      onImagesChange(newImages);
      return newImages;
    });
  }, [onImagesChange]);

  const isUploading = uploadsInProgress > 0;

  return (
    <div className={className}>
      {/* Image Slots - shown above prompt */}
      <div className="mb-2">
        <ImageSlots
          images={images}
          onFileSelect={handleFileSelect}
          onRemove={handleRemoveImage}
          maxSlots={maxImages}
          disabled={disabled || isUploading}
        />
      </div>

      {/* Upload Errors */}
      {uploadErrors.length > 0 && (
        <div className="mb-2 space-y-1">
          {uploadErrors.map((error) => (
            <p key={error} className="text-xs text-coral-600 dark:text-coral-400">
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Drop Overlay Wrapper */}
      <ImageDropOverlay
        onFileSelect={handleFileSelect}
        maxFiles={maxImages}
        currentFileCount={images.length}
        disabled={disabled || isUploading}
      >
        {children}
      </ImageDropOverlay>
    </div>
  );
}
