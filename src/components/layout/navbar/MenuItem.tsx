import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface MenuItemProps {
    title: string;
    href: string;
    className?: string;
    icon: string;
    children: React.ReactNode;
    isMobile?: boolean;
}

export default function MenuItem ({
    title,
    href,
    className,
    icon,
    children,
    isMobile
}: MenuItemProps){
    return (<li>
            {isMobile
            ? (<SheetClose asChild>
                <NavigationMenuLink asChild>
                    <Link
                        href={href}
                        className={cn(
                            "block p-3 leading-none no-underline outline-none",
                            className ? className : ""
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-[25px] h-[25px] rounded-md background-light400_light500 flex justify-center items-center">
                                <Image
                                    src={icon}
                                    alt="icon"
                                    width={16}
                                    height={16}
                                />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <p className="text-sm font-medium leading-none">
                                    {title}
                                </p>
                                <p className="line-clamp-2 text-xs text-muted">
                                    {children}
                                </p>
                            </div>
                        </div>
                    </Link>
                </NavigationMenuLink>
                </SheetClose>)
            : (<NavigationMenuLink asChild>
                    <Link
                        href={href}
                        className={cn(
                            "block rounded-md p-3 leading-none no-underline outline-none hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-slate-100/50 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus:bg-slate-800 dark:focus:text-slate-50 dark:data-[active]:bg-slate-800/50",
                            className
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-[25px] h-[25px] rounded-md background-light400_light500 flex justify-center items-center">
                                <Image
                                    src={icon}
                                    alt="icon"
                                    width={16}
                                    height={16}
                                    className="w-4 h-4"
                                />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <p className="text-sm font-medium leading-none">
                                    {title}
                                </p>
                                <p className="line-clamp-2 text-xs text-muted">
                                    {children}
                                </p>
                            </div>
                        </div>
                    </Link>
                </NavigationMenuLink>)}
    </li>)
};