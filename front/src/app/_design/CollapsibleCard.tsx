'use client';

import { useState, ReactNode } from 'react';
import {
  Card, CardBody, CardHeader, Divider,
} from '@heroui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import CardActionButton from '@/app/_design/CardActionButton';

interface CollapsibleCardProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  className?: string;
  headerExtra?: ReactNode;
  showDivider?: boolean;
}

export default function CollapsibleCard({
  title,
  children,
  defaultExpanded = false,
  className = '',
  headerExtra = null,
  showDivider = true,
}: CollapsibleCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">{title}</h3>
          </div>

          <div className="flex items-center space-x-2">
            {headerExtra}

            <CardActionButton onPress={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </CardActionButton>
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <>
          {showDivider && <Divider />}
          <CardBody>{children}</CardBody>
        </>
      )}
    </Card>
  );
}
