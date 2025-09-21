'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Icon from '@/app/_design/Icon';

interface ImageDropOverlayProps {
  onFileSelect: (files: File[]) => void;
  maxFiles?: number;
  currentFileCount?: number;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function ImageDropOverlay({
  onFileSelect,
  maxFiles = 3,
  currentFileCount = 0,
  disabled = false,
  children,
}: ImageDropOverlayProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  // Track drag enter/leave events to handle nested elements properly
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dragCounter, setDragCounter] = useState(0);

  const remainingSlots = maxFiles - currentFileCount;
  const canUpload = remainingSlots > 0 && !disabled;

  useEffect(() => {
    const handleWindowDragEnter = (e: DragEvent) => {
      e.preventDefault();
      if (canUpload && e.dataTransfer?.types.includes('Files')) {
        setDragCounter((prev) => prev + 1);
        setIsDragOver(true);
      }
    };

    const handleWindowDragLeave = (e: DragEvent) => {
      e.preventDefault();
      setDragCounter((prev) => {
        const newCounter = prev - 1;
        if (newCounter <= 0) {
          setIsDragOver(false);
          return 0;
        }
        return newCounter;
      });
    };

    const handleWindowDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleWindowDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      setDragCounter(0);

      if (!canUpload) return;

      const files = Array.from(e.dataTransfer?.files || []).filter((file) => (
        file && file.type && file.type.startsWith('image/')
      ));

      if (files.length > 0) {
        const filesToUpload = files.slice(0, remainingSlots);
        onFileSelect(filesToUpload);
      }
    };

    window.addEventListener('dragenter', handleWindowDragEnter);
    window.addEventListener('dragleave', handleWindowDragLeave);
    window.addEventListener('dragover', handleWindowDragOver);
    window.addEventListener('drop', handleWindowDrop);

    return () => {
      window.removeEventListener('dragenter', handleWindowDragEnter);
      window.removeEventListener('dragleave', handleWindowDragLeave);
      window.removeEventListener('dragover', handleWindowDragOver);
      window.removeEventListener('drop', handleWindowDrop);
    };
  }, [canUpload, remainingSlots, onFileSelect]);

  return (
    <div className="relative">
      {children}

      {/* Overlay that appears on drag */}
      {isDragOver && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-slate-400 dark:border-slate-500">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col items-center gap-3 text-center">
              <Icon
                icon="photo"
                size="l"
                className="text-slate-600 dark:text-slate-400"
              />
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  Drop images here to add them
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {remainingSlots}
                  {' of '}
                  {maxFiles}
                  {' slots available'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
