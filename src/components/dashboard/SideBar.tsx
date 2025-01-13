import { OVERVIEW_MENUITEMS } from "@/constants/global";
import UserAvatar from "../shared/UserAvatar"
import MenuGroup from "./MenuGroup";
import Logo from "../shared/Logo";


export default function SideBar() {
    return (
        <nav className="h-full p-2 relative">
            <span className="flex items-center gap-1 font-bold mt-4">
                <Logo /> 
                <span>Horizons</span>
                </span>
            <div className="mt-8 space-y-4">
                <MenuGroup title="Overview" items={OVERVIEW_MENUITEMS} />
            </div>
            <div className="absolute p-2 left-0 bottom-0 flex items-center gap-4">
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
    );
}