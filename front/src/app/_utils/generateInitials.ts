/**
 * Generate initials from a component name
 * @param name - Component name
 * @returns Initials (max 2 characters)
 */
export function generateInitials(name: string): string {
  if (!name || name.trim().length === 0) {
    return '?';
  }

  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    // Single word: take first 2 characters
    return words[0].substring(0, 2).toUpperCase();
  }

  // Multiple words: take first character of first 2 words
  return words
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();
}

/**
 * Generate a consistent color for component avatars based on name
 * @param name - Component name
 * @returns Tailwind color class
 */
export function generateAvatarColor(name: string): string {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
    'bg-teal-500',
    'bg-indigo-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-cyan-500',
  ];

  // Generate a consistent index based on name
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

/**
 * Format relative time for component history
 * @param dateString - ISO date string
 * @returns Formatted relative time
 */
export function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return 'Just now';
  } if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }
  return date.toLocaleDateString();
}
