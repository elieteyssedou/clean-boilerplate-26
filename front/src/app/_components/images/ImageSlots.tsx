'use client';

import * as React from 'react';
import { useRef } from 'react';
import { Button } from '@heroui/react';
import Icon from '@/app/_design/Icon';
import type { PromptImage } from '@/__generated__/graphql';

interface ImageSlotsProps {
  images: PromptImage[];
  onFileSelect: (files: File[]) => void;
  onRemove: (imageId: string) => void;
  maxSlots?: number;
  disabled?: boolean;
  className?: string;
}

export default function ImageSlots({
  images,
  onFileSelect,
  onRemove,
  maxSlots = 3,
  disabled = false,
  className = '',
}: ImageSlotsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddImageClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || disabled) return;

    const imageFiles = Array.from(files).filter((file) => (
      file && file.type && file.type.startsWith('image/')
    ));

    if (imageFiles.length > 0) {
      onFileSelect(imageFiles);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / (k ** i)).toFixed(1))} ${sizes[i]}`;
  };

  // Create display array: images + one add button if under max
  const items = [...images];
  const canAddMore = images.length < maxSlots && !disabled;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Render existing images */}
      {items.map((image) => (
        <div key={image.id} className="flex-shrink-0">
          <div className="relative group">
            <div className="h-6 px-2 bg-slate-100 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-600 rounded-md flex items-center gap-1.5">
              <Icon icon="photo" size="xs" className="text-slate-600 dark:text-slate-400" />
              <span className="text-xs text-slate-700 dark:text-slate-300 font-medium truncate max-w-16">
                {image.originalName}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {formatFileSize(image.size)}
              </span>
            </div>
            {/* Remove button - appears on hover */}
            <Button
              isIconOnly
              size="sm"
              variant="solid"
              color="danger"
              className="absolute -top-0.5 -right-0.5 w-3 h-3 min-w-3 opacity-0 group-hover:opacity-100 transition-opacity"
              onPress={() => onRemove(image.id)}
              isDisabled={disabled}
              aria-label="Remove image"
            >
              <Icon icon="x-mark" size="xs" />
            </Button>
          </div>
        </div>
      ))}
      {/* Single Add Image button */}
      {canAddMore && (
        <div className="flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onPress={handleAddImageClick}
            isDisabled={disabled}
            className="h-6 px-2 border border-dashed border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            startContent={<Icon icon="plus" size="xs" />}
          >
            <span className="text-xs">Add Image</span>
          </Button>
        </div>
      )}
    </div>
  );
}
