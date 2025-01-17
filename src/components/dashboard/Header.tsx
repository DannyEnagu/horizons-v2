import Image from "next/image";
import ThemeSwitch from "../shared/navbar/ThemeSwitch";
import { Button } from "../ui/button";
import Link from "next/link";
import MobileSideMenu from "./MobileSideMenu";

export default function Header() {
    const isUnreadAlert = true;
    return (
        <header className="flex items-center justify-between p-4 border-b border-color h-[73px]">
            <div className="flex items-center gap-0 md:ml-8">
                <MobileSideMenu />
                <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
                <ThemeSwitch />
                {isUnreadAlert && (<Link href="/employer/dashboard/notifications" className="relative">
                    <span className="absolute top-[-5px] right-[-5px] h-2 w-2 bg-red-500 rounded-full"></span>
                    <Image
                        src="/icons/bell.svg"
                        alt="Bell Icon"
                        width={24}
                        height={24}
                        className="invert-colors"
                    />
                </Link>)}
                <Button
                    variant="secondary"
                    size="sm"
                >
                    <Link href="/post-job">
                        Post a Job
                    </Link>
                </Button>
            </div>
        </header>
    );
}