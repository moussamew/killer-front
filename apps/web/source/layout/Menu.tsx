import { useTranslation } from '@killerparty/intl';
import { Languages } from 'lucide-react';
import React from 'react';

import {
  ListItem,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/NavigationMenu';
import { languageToLocale, localeToLanguage } from '@/constants/languages';

export function Menu() {
  const { t, i18n } = useTranslation();

  const handleUpdateLanguage = (language: string): void => {
    i18n.changeLanguage(languageToLocale[language]);
    localStorage.setItem('locale', languageToLocale[language]);
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <div className="flex items-center">
              <Languages className="h-4 w-4 mr-2" />
              {localeToLanguage[i18n.language]}
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="left-0 grid gap-3 p-4 lg:grid-cols-1 md:w-[200px]">
              <ListItem
                onClick={() => handleUpdateLanguage('Français')}
                title="Français"
              >
                {t('menu.language.french')}
              </ListItem>
              <ListItem
                onClick={() => handleUpdateLanguage('English')}
                title="English"
              >
                {t('menu.language.english')}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
