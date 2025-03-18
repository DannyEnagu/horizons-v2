'use client';
import Image from "next/image";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import UserAvatar from "../shared/UserAvatar";
import { Button } from "../ui/button";
import TalentCard from "../talents/TalentCard";

export default function Messages() {
    return (
        <ul className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
                <MessageItem key={item} />
            ))}
        </ul>
    )
}

function MessageItem() {
    return (
        <TalentCard
            profile={{
                headline: 'Software Engineer',
                location: 'Lagos, Nigeria',
                skills: ['React', 'Node.js', 'TypeScript'],
                bio: 'John Just saved the job for later. view their profile to see more details.',
                id: '1',
                phone: '08012345678',
                gender: 'male',
                userId: '1',
                totalYearsExperience: 2,
            }}
            user={{
                avatar: '',
                fullName: 'John Doe',
                role: 'JOBSEEKER',
                id: '1',
                email: '',

            }}
            workExperience={[]}
            socials={[]}
        >
            <li className="background-light800_dark_gradient p-4 flex items-center rounded-md cursor-pointer">
                <div className="flex items-center justify-between rounded-full">
                    <UserAvatar
                        name={"John Doe"}
                        avatar={''}
                        className="mr-4"
                    />
                </div>
                <div>
                    <p className="text-muted text-xs">
                        Software Engineer
                    </p>
                    <p className="my-2 text-muted text-xs">
                        Lagos, Nigeria
                    </p>
                    <p>
                        John Just saved the job for later.
                        Click to view John{"'"}s profile details.
                    </p>
                </div>
                <div className="ml-auto self-start flex items-center gap-2">
                    <p className="text-muted text-xs">
                        2 days ago
                    </p>
                    <MoreOptions />
                </div>
            </li>
        </TalentCard>
    )
}

function MoreOptions() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Image
                        src={`/icons/ellipsis-vertical.svg`}
                        alt="More Options"
                        width={24}
                        height={24}
                        className="invert-colors"
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-[150px] py-2 rounded border border-color bg-light-900 dark:border-dark-400 dark:bg-dark-300">
            </PopoverContent>
        </Popover> 
    );
}