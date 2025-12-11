import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center justify-center gap-2 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md", className)}>
      <img 
        src="/logo.png"
        alt="InTrack Logo"
        width={40}
        height={40}
        className="rounded-md bg-transparent"
      />
      <span className="text-xl font-bold tracking-tight">InTrack</span>
    </Link>
  );
}
