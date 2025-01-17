import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  Sheet,
//   SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import UserAvatar from "../shared/UserAvatar";
import MenuGroup from "./MenuGroup";
import { HIRING_MENUITEMS, OVERVIEW_MENUITEMS, SETTINGS_MENUITEMS } from "@/constants/global";
import Logo from "../shared/Logo";


export default function MobileSideMenu() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Image
                        src="/icons/humbugger.svg"
                        alt="Toggle Mobile Menu"
                        width={24}
                        height={24}
                        className="dark:invert-colors"
                    />
                </Button>
            </SheetTrigger>
            <SheetHeader className="sr-only">
                <SheetTitle>Mobile Menu</SheetTitle>
                <SheetDescription>
                    Mobile menu dialog
                </SheetDescription>
            </SheetHeader>
            <SheetContent side="left" className="bg-light-900 dark:bg-dark-200 text-dark-300 dark:text-light-900 border-none">
                <nav className="flex flex-col h-full overflow-auto p-2 relative">
                    <Link href="/" className="flex items-center gap-1 font-bold mt-4">
                        <Logo />
                        <span>Horizons</span>
                    </Link>
                    <div className="mt-8 mb-4 space-y-3">
                        <MenuGroup
                            title="Overview"
                            items={OVERVIEW_MENUITEMS}
                            type="mobile"
                        />
                        <MenuGroup
                            title="Manage Hiring"
                            items={HIRING_MENUITEMS}
                            type="mobile"
                        />
                        <MenuGroup
                            title="Settings"
                            items={SETTINGS_MENUITEMS} type="mobile"
                        />
                    </div>
                    <div className="mt-auto p-2 flex items-center gap-4">
                        <UserAvatar
                            name={'John Doe'}
                            avatar={''}
                            className="rounded-full w-8 h-8"
                        />
                        <div className="flex flex-col">
                            <p className="text-sm">John Doe</p>
                            <span className="text-xs text-muted">
                                johndoe@gmail.com
                            </span>
                        </div>
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    );
}