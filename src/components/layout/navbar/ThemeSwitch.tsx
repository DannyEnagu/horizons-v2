'use client';
import { Button } from "@/components/ui/button";
import { useTheme } from '@/context/ThemeProvider';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import { themes } from "@/constants/global";
import Image from "next/image";


export default function ThemeSwitch() {
    const { mode, setMode } = useTheme();

    const handleThemeChange = (theme: string) => {
        setMode(theme);
        if (theme !== 'system') {
            localStorage.theme = theme;
          } else {
            localStorage.removeItem('theme');
          }
    }
    return (<Popover>
        <PopoverTrigger asChild>
            <Button
                variant="ghost"
                size="icon"
            >
                <Image
                    src={`/icons/${mode === 'dark' ? 'sun' : 'moon'}.svg`}
                    alt="Toggle Theme"
                    width={24}
                    height={24}
                    className={`transform active-theme ${mode === 'dark' ? 'rotate-180' : 'rotate-180'}`}
                />
            </Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" align="start" className="w-[200px] py-2 rounded border border-color bg-light-900 dark:border-dark-400 dark:bg-dark-300">
            <h3 className="mb-2">Theme</h3>
            <ul>
                {themes.map((theme) => (
                    <li key={theme.value}>
                        <Button variant="ghost" size="sm" className="flex-start w-full" onClick={() => handleThemeChange(theme.value)}>
                            <Image
                                src={theme.icon}
                                alt={theme.label}
                                width={16}
                                height={16}
                                className={`invert-colors ${mode === theme.value && 'active-theme'}`}
                            />
                            <span>{theme.label}</span>
                            {theme.value === mode && (
                                <span className="active-theme text-xs ml-auto">Active</span>
                            )}
                        </Button>
                    </li>
                ))}
            </ul>
        </PopoverContent>
    </Popover>
    );
}