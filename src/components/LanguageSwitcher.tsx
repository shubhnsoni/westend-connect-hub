import { Globe, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/hooks/useTranslation";
import type { Language } from "@/contexts/LanguageContext";

const languages: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "zh", label: "中文" },
];

const LanguageSwitcher = () => {
  const { language, setLanguage, isTranslating } = useTranslation();
  const current = languages.find((l) => l.code === language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-2 text-xs xl:text-sm font-medium transition-colors rounded-md text-foreground hover:text-primary hover:bg-muted">
        {isTranslating ? (
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
        ) : (
          <Globe className="w-4 h-4" />
        )}
        <span className="hidden xl:inline">{current.label}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background border-border z-[60] min-w-[120px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer ${language === lang.code ? "font-semibold text-primary" : ""}`}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
