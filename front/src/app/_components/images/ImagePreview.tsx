'use client';

import * as React from 'react';
import { Button } from '@heroui/react';
import Icon from '@/app/_design/Icon';
import type { PromptImage } from '@/__generated__/graphql';

interface ImagePreviewProps {
  images: PromptImage[];
  onRemove?: (imageId: string) => void;
  onReorder?: (fromIndex: number, toIndex: number) => void;
  className?: string;
  showRemove?: boolean;
}

export default function ImagePreview({
  images,
  onRemove = undefined,
  onReorder = undefined,
  className = '',
  showRemove = true,
}: ImagePreviewProps) {
  if (images.length === 0) {
    return null;
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / (k ** i)).toFixed(1))} ${sizes[i]}`;
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon icon="photo" size="xs" className="text-slate-500 dark:text-slate-400" />
        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
          {images.length}
          {' image'}
          {images.length !== 1 ? 's' : ''}
          {' attached'}
        </span>
      </div>

      <div className="space-y-2">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
          >
            {/* File icon */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                <Icon icon="photo" size="xs" className="text-slate-600 dark:text-slate-400" />
              </div>
            </div>

            {/* File info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                {image.originalName}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {formatFileSize(image.size)}
                {' • '}
                {image.mimeType.split('/')[1].toUpperCase()}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* Reorder buttons */}
              {onReorder && images.length > 1 && (
                <>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => onReorder(index, Math.max(0, index - 1))}
                    isDisabled={index === 0}
                    className="w-6 h-6 min-w-6"
                    aria-label="Move up"
                  >
                    <Icon icon="chevron-up" size="xs" />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => onReorder(index, Math.min(images.length - 1, index + 1))}
                    isDisabled={index === images.length - 1}
                    className="w-6 h-6 min-w-6"
                    aria-label="Move down"
                  >
                    <Icon icon="chevron-down" size="xs" />
                  </Button>
                </>
              )}

              {/* Remove button */}
              {showRemove && onRemove && (
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="danger"
                  onPress={() => onRemove(image.id)}
                  className="w-6 h-6 min-w-6"
                  aria-label="Remove image"
                >
                  <Icon icon="x-mark" size="xs" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
