
'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const SpainFlag = () => <span className="fi fi-es"></span>;
const CataloniaFlag = () => <span className="fi fi-ad"></span>; // Using Andorra as proxy for Catalan flag as it's common

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const changeLocale = (nextLocale: string) => {
    // This regex replaces the current locale in the path with the new one
    const newPath = pathname.replace(/^\/(es|ca)/, `/${nextLocale}`);
    router.replace(newPath);
  };
  
  const getFlag = (loc: string) => {
    switch (loc) {
      case 'es':
        return <img src="https://flagcdn.com/w20/es.png" alt="Español" />;
      case 'ca':
        return <img src="https://flagcdn.com/w20/ad.png" alt="Català" />; // Using Andorra as proxy
      default:
        return <Globe className="h-5 w-5" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {getFlag(locale)}
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => changeLocale('es')}>
          <img src="https://flagcdn.com/w20/es.png" alt="Español" className="mr-2" />
          Español
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => changeLocale('ca')}>
           <img src="https://flagcdn.com/w20/ad.png" alt="Català" className="mr-2" />
          Català
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
