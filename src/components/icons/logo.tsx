import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center justify-center gap-2 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md", className)}>
      <Image
        src="/upload/logo.png"
        alt="SwiftSend Logo"
        width={32}
        height={32}
        className="h-8 w-8"
      />
      <span className="text-xl font-bold tracking-tight group-hover:text-background">SwiftSend</span>
    </Link>
  );
}
