import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center justify-center gap-2 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7 text-primary"
      >
        <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v2" />
        <path d="M21 14v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6" />
        <path d="m3.3 9 8.7 5 8.7-5" />
        <path d="M12 22V14" />
      </svg>
      <span className="text-xl font-bold tracking-tight">SwiftSend</span>
    </Link>
  );
}
