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
        <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
        <path d="M14 9h7l-2 5h-5Z" />
        <path d="M10 6H8" />
        <path d="M12 6h-1" />
        <path d="m19 14 2.5 2.5-2.5 2.5" />
        <path d="M14 19h-1" />
        <path d="M10 19H8" />
      </svg>
      <span className="text-xl font-bold tracking-tight">SwiftSend</span>
    </Link>
  );
}
