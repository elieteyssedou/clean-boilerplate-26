'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownProps {
  content: string;
  className?: string;
}

// Markdown component definitions
const markdownComponents = {
  // Customize code blocks
  code: ({ className: codeClassName, children }: any) => {
    const match = /language-(\w+)/.exec(codeClassName || '');
    const isInline = !match;

    if (!isInline && match) {
      return (
        <div className="rounded-lg bg-slate-100 dark:bg-slate-800 p-4 my-4 overflow-x-auto">
          <pre className="text-sm">
            <code className={codeClassName}>
              {children}
            </code>
          </pre>
        </div>
      );
    }

    return (
      <code
        className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-sm font-mono"
      >
        {children}
      </code>
    );
  },
  // Customize headings
  h1: ({ children }: any) => (
    <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 mt-6 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 mt-5 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2 mt-4 first:mt-0">
      {children}
    </h3>
  ),
  // Customize paragraphs
  p: ({ children }: any) => (
    <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
      {children}
    </p>
  ),
  // Customize lists
  ul: ({ children }: any) => (
    <ul className="text-slate-700 dark:text-slate-300 mb-3 space-y-1 list-disc list-inside">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="text-slate-700 dark:text-slate-300 mb-3 space-y-1 list-decimal list-inside">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="leading-relaxed">
      {children}
    </li>
  ),
  // Customize links
  a: ({ href, children }: any) => (
    <a
      href={href}
      className="text-coral-600 dark:text-coral-400 hover:text-coral-700 dark:hover:text-coral-300 underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  // Customize blockquotes
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-slate-300 dark:border-slate-600 pl-4 italic text-slate-600 dark:text-slate-400 my-4">
      {children}
    </blockquote>
  ),
};

export default function Markdown({ content, className = '' }: MarkdownProps) {
  return (
    <div className={`prose prose-sm max-w-none dark:prose-invert ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
