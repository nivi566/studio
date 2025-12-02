import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center justify-center gap-2 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md", className)}>
        <svg
            className="h-8 w-8 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14 9.5V5.5a1.5 1.5 0 0 0-3 0v4" />
            <path d="M11.5 16.5a1.5 1.5 0 0 1-3 0V10" />
            <path d="M7 16.5a1.5 1.5 0 0 1-3 0V10" />
            <path d="M17 16.5a1.5 1.5 0 0 1-3 0V9.5" />
            <path d="M21 14.5V10a2 2 0 0 0-2-2h-3.5a2 2 0 0 0-2 2v10.5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V18a2 2 0 0 1 2-2h1.5a2 2 0 0 0 2-2Z" />
            <path d="M3.5 10H8" />
            <path d="m2 16 6-3" />
        </svg>
      <span className="text-xl font-bold tracking-tight">SwiftSend</span>
    </Link>
  );
}
