import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { EMPLOYER_MENU } from "@/constants/menu";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { SheetClose } from "@/components/ui/sheet";

interface MenuProps {
    type?: string;
}

export default function Menu ({ type }: MenuProps) {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    {type === "mobile"
                    ? (<SheetClose asChild>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/">
                                Jobs
                            </NavigationMenuLink>
                        </SheetClose>)
                  : (<Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Jobs
                        </NavigationMenuLink>
                    </Link>)}
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        For Employer
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="flex flex-col w-[300px] gap-1 p-4 md:w-[500px] lg:w-[600px] background-light900_dark300">
                            {EMPLOYER_MENU.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    title={item.title}
                                    href={item.href}
                                    icon={item.icon}
                                    isMobile={type === "mobile"}
                                >
                                    {item.description}
                                </MenuItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    {type === "mobile"
                    ? (<SheetClose asChild>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
                                Resources
                            </NavigationMenuLink>
                        </SheetClose>)
                    : (<Link href="#" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Resources
                            </NavigationMenuLink>
                        </Link>)}
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}