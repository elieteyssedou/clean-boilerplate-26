'use client';

import * as React from 'react';
import { useState, useRef } from 'react';
import { Button } from '@heroui/react';
import Icon from '@/app/_design/Icon';

interface ImageUploadZoneProps {
  onFileSelect: (files: File[]) => void;
  maxFiles?: number;
  currentFileCount?: number;
  disabled?: boolean;
  isUploading?: boolean;
  className?: string;
}

export default function ImageUploadZone({
  onFileSelect,
  maxFiles = 3,
  currentFileCount = 0,
  disabled = false,
  isUploading = false,
  className = '',
}: ImageUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const remainingSlots = maxFiles - currentFileCount;
  const canUpload = remainingSlots > 0 && !disabled;

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (canUpload) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (!canUpload) return;

    const files = Array.from(e.dataTransfer.files).filter((file) => (
      file && file.type && file.type.startsWith('image/')
    ));

    if (files.length > 0) {
      const filesToUpload = files.slice(0, remainingSlots);
      onFileSelect(filesToUpload);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || !canUpload) return;

    const imageFiles = Array.from(files).filter((file) => (
      file && file.type && file.type.startsWith('image/')
    ));

    if (imageFiles.length > 0) {
      const filesToUpload = imageFiles.slice(0, remainingSlots);
      onFileSelect(filesToUpload);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (canUpload && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Drop zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={[
          'border-2 border-dashed rounded-xl p-4 transition-all duration-200',
          canUpload ? 'cursor-pointer' : 'cursor-not-allowed',
          (() => {
            if (isDragOver && canUpload) {
              return 'border-slate-400 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-500';
            }
            if (canUpload) {
              return 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500';
            }
            return 'border-slate-200 dark:border-slate-700 opacity-50';
          })(),
        ].join(' ')}
        onClick={handleClick}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && canUpload) {
            handleClick();
          }
        }}
        role="button"
        tabIndex={canUpload ? 0 : -1}
      >
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <Icon
            icon={isUploading ? 'spinner' : 'photo'}
            size="m"
            className={`text-slate-500 dark:text-slate-400 ${isUploading ? 'animate-spin' : ''}`}
          />

          {(() => {
            if (isUploading) {
              return (
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Uploading images...
                </p>
              );
            }
            if (canUpload) {
              return (
                <>
                  <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                    Drop images here or click to upload
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {remainingSlots}
                    {' of '}
                    {maxFiles}
                    {' slots available'}
                  </p>
                </>
              );
            }
            return (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Maximum
                {' '}
                {maxFiles}
                {' images reached'}
              </p>
            );
          })()}
        </div>
      </div>

      {/* Add Image Button */}
      {canUpload && (
        <Button
          variant="ghost"
          size="sm"
          onPress={handleClick}
          isDisabled={!canUpload || isUploading}
          startContent={<Icon icon="plus" size="xs" />}
          className="absolute -bottom-10 left-0 text-slate-600 dark:text-slate-400 h-6 px-2 text-xs"
        >
          Add Image
        </Button>
      )}
    </div>
  );
}
