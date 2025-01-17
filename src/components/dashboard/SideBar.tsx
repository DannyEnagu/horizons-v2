"use client";

import { HIRING_MENUITEMS, OVERVIEW_MENUITEMS, SETTINGS_MENUITEMS } from "@/constants/global";
import UserAvatar from "../shared/UserAvatar"
import MenuGroup from "./MenuGroup";
import Logo from "../shared/Logo";
import Link from "next/link";


export default function SideBar() {
    return (
        <aside className="hidden md:block h-full overflow-auto w-[250px] border-r border-color">
            <nav className="flex flex-col h-full overflow-auto p-2 relative">
                <Link href="/" className="flex items-center gap-1 font-bold mt-4">
                    <Logo />
                    <span>Horizons</span>
                </Link>
                <div className="mt-8 mb-4 space-y-3">
                    <MenuGroup title="Overview" items={OVERVIEW_MENUITEMS} />
                    <MenuGroup title="Manage Hiring" items={HIRING_MENUITEMS} />
                    <MenuGroup title="Settings" items={SETTINGS_MENUITEMS} />
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
        </aside>
    );
}