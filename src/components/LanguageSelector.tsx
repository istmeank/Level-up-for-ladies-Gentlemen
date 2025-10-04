import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages, ChevronDown } from "lucide-react";
import { FrenchFlag, USFlag, AlgerianFlag } from "./FlagIcons";
import { useTranslation } from "react-i18next";

interface Language {
  code: string;
  name: string;
  FlagComponent: React.ComponentType<{ className?: string }>;
}

const languages: Language[] = [
  { code: 'fr', name: 'Français', FlagComponent: FrenchFlag },
  { code: 'en', name: 'English', FlagComponent: USFlag },
  { code: 'ar', name: 'العربية', FlagComponent: AlgerianFlag },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    languages.find(lang => lang.code === i18n.language) || languages[0]
  );

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language.code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-cosmic-star-white/80 hover:text-cosmic-stellar-gold hover:bg-cosmic-stellar-gold/10 border border-cosmic-stellar-gold/20 backdrop-blur-sm"
        >
          <Languages className="w-4 h-4" />
          <currentLanguage.FlagComponent className="w-5 h-3" />
          <span className="hidden sm:inline">{currentLanguage.code.toUpperCase()}</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-44 bg-cosmic-deep-space/95 backdrop-blur-lg border border-cosmic-stellar-gold/20 z-50"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-cosmic-stellar-gold/10 focus:bg-cosmic-stellar-gold/10 text-cosmic-star-white/90"
          >
            <language.FlagComponent className="w-5 h-3" />
            <span className="flex-1">{language.name}</span>
            {currentLanguage.code === language.code && (
              <div className="w-2 h-2 rounded-full bg-cosmic-stellar-gold"></div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;