'use client';

import Image from "next/image";
import Link from "next/link";
import { SheetClose } from "../../ui/sheet";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface MenuItemProps {
    label: string;
    url: string;
    icon?: string;
    count?: number;
    isActive?: boolean;
}
interface MenuGroupProps {
    title: string,
    type?: 'mobile' | 'desktop',
    items: MenuItemProps[],
    children?: React.ReactNode
}

export default function MenuGroup (
    {title, type, items, children}: MenuGroupProps
) {
    // const {isAuthenticated, } = getKindeServerSession();
    const pathname = usePathname();
    const [activeLink, setActiveLink] = useState<string | null>(null);

    useEffect(() => {
        setActiveLink(pathname);
    }, [pathname]);

    // Construct menu items
    const menuItems = items.map((item) => (
        <li key={item.label}>
            {type === "mobile"
                ? (<SheetClose asChild>
                        <MenuItem
                            item={{
                                ...item,
                                isActive: activeLink === item.url  }
                            }
                        />
                    </SheetClose>)
                :   (
                    <MenuItem
                        item={{
                            ...item,
                            isActive: activeLink === item.url}
                        }
                    />
                )
        }
        </li>
    ))
    // Render menu group
    return (
        <div>
            <h3 className="text-muted text-sm mb-4">
                {title}
            </h3>
            <ul className="background-light800_dark_gradient p-2 rounded-md space-y-[2px]">
                {menuItems}
                {children && <li>{children}</li>}
            </ul>
        </div>
    );
}

function MenuItem ({item}: {item: MenuItemProps}) {
    return (
        <Link href={item.url} className={`group/item transition flex items-center gap-2 text-sm bg-transparent ease-in-out delay-150 hover:background-light850_dark100 hover:text-w duration-300 p-2 rounded-md ${item.isActive ? 'background-light850_dark100' : ''}`}>
            <Image
                src={`/icons/${item.icon}.svg`}
                width={18}
                height={18}
                alt={item.label}
                className={`transition bg-transparent invert-colors ease-in-out delay-150 group-hover/item:active-theme duration-300 ${item.isActive ? 'active-theme' : ''}`}
            />
            <span>{item.label}</span>
            {item.count && (
                <span className="ml-auto text-xs  bg-red-500 text-white rounded-md px-1">
                    {item.count}
                </span>
            )}
        </Link>
    );
}