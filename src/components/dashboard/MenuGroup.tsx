'use client';

import Image from "next/image";
import Link from "next/link";
import { SheetClose } from "../ui/sheet";


interface MenuGroupProps {
    title: string,
    type?: 'mobile' | 'desktop',
    items: {
        label: string;
        url: string;
        icon?: string;
        count?: number;
    }[]
}

export default function MenuGroup (
    {title, type, items}: MenuGroupProps
) {
    const pathname = window.location.pathname;

    const isActiveLink = (url: string) => {
        return pathname === url;
    }
    const menuItems = items.map((item) => (
        <li key={item.label}>
            {type === "mobile"
                ? (<SheetClose asChild>
                        <Link href={item.url} className={`group/item transition flex items-center gap-2 text-sm bg-transparent ease-in-out delay-150 hover:background-light850_dark100 hover:text-w duration-300 p-2 rounded-md ${isActiveLink(item.url) ? 'background-light850_dark100' : ''}`}>
                            <Image
                                src={`/icons/${item.icon}.svg`}
                                width={18}
                                height={18}
                                alt={item.label}
                                className={`transition bg-transparent invert-colors ease-in-out delay-150 group-hover/item:active-theme duration-300 ${isActiveLink(item.url) ? 'active-theme' : ''}`}
                            />
                            <span>{item.label}</span>
                            {item.count && (
                                <span className="ml-auto text-xs  bg-red-500 text-white rounded-md px-1">
                                    {item.count}
                                </span>
                            )}
                        </Link>
                    </SheetClose>)
                :   (<Link href={item.url} className={`group/item transition flex items-center gap-2 text-sm bg-transparent ease-in-out delay-150 hover:background-light850_dark100 hover:text-w duration-300 p-2 rounded-md ${isActiveLink(item.url) ? 'background-light850_dark100' : ''}`}>
                        <Image
                            src={`/icons/${item.icon}.svg`}
                            width={18}
                            height={18}
                            alt={item.label}
                            className={`transition bg-transparent invert-colors ease-in-out delay-150 group-hover/item:active-theme duration-300 ${isActiveLink(item.url) ? 'active-theme' : ''}`}
                        />
                        <span>{item.label}</span>
                        {item.count && (
                            <span className="ml-auto text-xs  bg-red-500 text-white rounded-md px-1">
                                {item.count}
                            </span>
                        )}
                    </Link>)
            }
        </li>
    ))
    return (
        <div>
            <h3 className="text-muted text-sm mb-4">
                {title}
            </h3>
            <ul className="background-light800_dark_gradient p-2 rounded-md space-y-[2px]">
                {menuItems}
            </ul>
        </div>
    );
}