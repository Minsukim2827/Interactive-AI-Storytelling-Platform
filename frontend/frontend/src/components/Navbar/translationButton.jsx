import { useTranslation } from 'react-i18next'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/Navbar/dropdown-menu";
import { Button } from "@/components/Navbar/darkModeButton";
import { Languages } from 'lucide-react';

const lngs = {
    en: { nativeName: 'English' },
    zh: { nativeName: '中文' }
};

export function TranslationButton() {
    const { i18n } = useTranslation();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Languages />
                    <span className="sr-only">Toggle Translation</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {Object.keys(lngs).map((lng) => (
                    <DropdownMenuItem key={lng} onClick={() => i18n.changeLanguage(lng)}>
                        {lng}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
