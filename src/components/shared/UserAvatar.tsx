import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

interface User {
    name: string | null;
    avatar: string | null;
    className?: string;
}

export default function UserAvatar({ name, avatar, className }: User) {
    return (
        <Avatar className={`h-10 w-10 rounded-full ring-1 ring-color ${className ? className : ''}`}>
            <AvatarImage
                src={`${avatar}`}
                alt={`${name}'s avatar`}
            />
            <AvatarFallback>
                {name
                    ? name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase()
                    : "U"}
            </AvatarFallback>
        </Avatar>
    );
}