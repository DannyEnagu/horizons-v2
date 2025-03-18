"use client";

import { useEffect, useState } from "react";
import { PowerOff } from "lucide-react";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";

import {
    HIRING_MENUITEMS,
    OVERVIEW_MENUITEMS,
    SETTINGS_MENUITEMS
} from "@/constants/menu";
import UserAvatar from "../../shared/UserAvatar"
import MenuGroup from "./MenuGroup";
import Logo from "../../shared/Logo";
import { Button } from "../../ui/button";
import { getUsersByKindeId } from "@/server/actions/user.action";
import { User } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";


export default function SideBar() {
    const [user, setUser] = useState<User | null>(null);
    const { getUser } = useKindeBrowserClient();
    const userId = getUser()?.id;

    useEffect(() => {
        // Fetch user data
        async function fetchUser() {
            try {
                const db_user  = await getUsersByKindeId(userId);
                setUser(db_user);
            } catch (error) {
                console.error(`❌ ${error} ❌`);
            }
        }

        fetchUser();

    }, [userId]);

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
                    <MenuGroup title="Settings" items={SETTINGS_MENUITEMS}>
                        <Button
                            variant="link"
                            size="sm"
                            className="w-full justify-start !text-red-700"
                        >
                            <PowerOff size={18} />
                            <LogoutLink postLogoutRedirectURL="/">Logout</LogoutLink>
                        </Button>
                    </MenuGroup>
                </div>
                <div className="mt-auto p-2 flex items-center gap-4">
                    {user
                        ?   <>
                                <UserAvatar
                                    name={user?.fullName || ''}
                                    avatar={user?.avatar || ''}
                                    className="rounded-full w-8 h-8"
                                />
                                <div className="flex flex-col">
                                    <p className="text-sm">{user?.fullName}</p>
                                    <span className="text-xs text-muted">
                                        {user?.email}
                                    </span>
                                </div>
                            </>
                        :   <>
                                <UserAvatar
                                    name="User"
                                    avatar=""
                                    className="rounded-full w-8 h-8"
                                />
                                <Skeleton className="w-20 h-4" />
                            </>
                    }
                </div>
            </nav>
        </aside>
    );
}