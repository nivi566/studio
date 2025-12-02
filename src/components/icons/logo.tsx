import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Package } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center justify-center gap-2 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md", className)}>
        <Package className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold tracking-tight">SwiftSend</span>
    </Link>
  );
}
