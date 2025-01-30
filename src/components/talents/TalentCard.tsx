import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import UserAvatar from "../shared/UserAvatar";
import Skills from "../shared/Skills";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { Experience, JobSeeker, SocialProfile, User } from "@prisma/client";
import { Briefcase, ExternalLink, Mail, MapPin, Smartphone } from "lucide-react";

export interface TalentCardProps {
    children?: React.ReactNode;
    profile: JobSeeker;
    user: Pick<User, "fullName" | "avatar" | "email" | "role" | "id">;
    workExperience: Experience[];
    socials: SocialProfile[];
}

export default function TalentCard({
    profile,
    user,
    workExperience,
    socials,
    children,
}: TalentCardProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {/* <Card className="cursor-pointer">
                    <CardHeader>
                        <div className="flex items-center justify-center">
                            <div className="p-[7px] rounded-full background-light400_light500">
                                <UserAvatar
                                    name={user.fullName}
                                    avatar={user.avatar}
                                    className="h-[120px] sm:h-[150px] w-[120px] sm:w-[150px]"
                                />
                            </div>
                        </div>
                        <CardTitle className="text-center space-y-2 !mt-4">
                            <p>{user.fullName}</p>
                            <p className="text-muted text-xl">{profile.headline}</p>
                        </CardTitle>
                        <CardDescription className="text-center text-muted sm:leading-6">
                            {profile.bio}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h3>Top Skills</h3>
                        <Skills skills={topSkills} />
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" size="sm" className="block w-full">
                            View Profile
                        </Button>
                    </CardFooter>
                </Card> */}
                {children}
            </DialogTrigger>
            <DialogContent className="dialog-2xl p-8">
                <DialogHeader className="sr-only">
                    <DialogTitle>
                        Talent Profile
                    </DialogTitle>
                    <DialogDescription>
                        Learn more about the talent
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
                    <Card className="cursor-pointer">
                        <CardHeader>
                            <div className="flex items-center justify-center">
                                <div className="p-1 rounded-full background-light400_light500">
                                    <UserAvatar
                                        name={user.fullName}
                                        avatar={user.avatar}
                                        className="h-[120px] sm:h-[150px] w-[120px] sm:w-[150px]"
                                    />
                                </div>
                            </div>
                            <CardTitle className="text-center space-y-2 !mt-4">
                                <p className="text-[#14A800]">
                                    {user.fullName}
                                </p>
                                <p className="text-muted text-xl">
                                    {profile.headline}
                                </p>
                            </CardTitle>
                            <CardDescription className="text-center text-muted sm:leading-6  !my-8">
                                {profile.bio}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <h3>Skills</h3>
                            <Skills skills={profile.skills} />
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" size="sm" className="block w-full">
                                <a href={`mailto:${user.email}`}>Contact Talent</a>
                            </Button>
                        </CardFooter>
                    </Card>
                    <div className="flex flex-col gap-4">
                        <Card className="flex flex-col-reverse sm:flex-row sm:items-center gap-4">
                            <CardHeader className="flex flex-col">
                                <CardTitle className="text-lg">
                                    Personal Information
                                </CardTitle>
                                <div className="grid grid-cols-[30px_1fr] gap-2">
                                    <p className="flex flex-col gap-3 text-muted">
                                        <strong><Mail /> </strong>
                                        <strong><Smartphone /> </strong>
                                        <strong><MapPin /> </strong>
                                        <strong><ExternalLink /> </strong>
                                        <strong><Briefcase /> </strong>
                                    </p>
                                    <p className="flex flex-col gap-3">
                                        <span>{user.email}</span>
                                        <span>{profile.phone}</span>
                                        <span>{profile.location}</span>
                                        <span className="flex items-center gap-2 mt-1">
                                            {socials?.map((link) => (
                                                <a
                                                    key={link.id}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-green-500"
                                                >
                                                    <Image
                                                        src={`/icons/${link.platform.toLowerCase()}.svg`}
                                                        alt={`${link.platform} icon`}
                                                        width={20}
                                                        height={20}
                                                        className="active-theme"
                                                    />
                                                </a>
                                            ))}
                                            {socials?.length === 0 && "N/A"}
                                        </span>
                                        <span>{profile.totalYearsExperience}+ years</span>
                                    </p>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 flex items-center justify-center p-0">
                                <Image
                                    src="/undraw_mailbox.svg"
                                    alt="messaging illustration"
                                    width={180}
                                    height={180}
                                    className="h-[180px] md:w-[300px]"
                                />
                            </CardContent>
                        </Card>
                        <Card className="flex-1">
                            <CardHeader className="py-4">
                                <CardTitle className="text-base text-[#14A800]">
                                    Work Experience
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 px-4">
                                    {/* Experiences */}
                                    {workExperience.map((work, index) => (
                                        <div key={index} className={cn("flex items-start gap-4 border-l-4",
                                            index < 2 ? "border-color" : "border-transparent"
                                        )}>
                                            <div className="w-[20px] h-[20px] rounded-full bg-[#14A800] ml-[-12px] mt-[-8px]"/>
                                            <div className="flex-1 space-y-1 mb-8 mr-4">
                                                <h3>
                                                    {work.designation}
                                                </h3>
                                                <h4 className="text-sm">
                                                    {work.company}
                                                </h4>
                                                <p className="flex justify-between items-center text-sm text-muted">
                                                    <span>{work.jobType}</span>
                                                    <span>
                                                        {work.term}
                                                    </span>
                                                </p>
                                                <p className="text-sm leading-6 !mt-6">
                                                    {work.summary}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-center gap-4 mt-8 px-4">
                                    <Button variant="outline" size="sm" className="" disabled>
                                        Prev
                                    </Button>
                                    <span className="text-muted text-xs">
                                        Page 1 of 1
                                    </span>
                                    <Button variant="outline" size="sm" className=""disabled>
                                        Next
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}


export const LoadingTalentCard = () => {
    return (
        <Card className="cursor-pointer">
            <CardHeader>
                <div className="flex items-center justify-center">
                    <Skeleton
                        className="h-[120px] sm:h-[150px] w-[120px] sm:w-[150px] rounded-full"
                    />
                </div>
                <CardTitle className="space-y-2 !mt-4">
                    <Skeleton className="h-5 w-24 mx-auto" />
                    <Skeleton className="h-4 w-40 mx-auto" />
                </CardTitle>
                <CardDescription className="flex flex-col items-center gap-2 !mt-6">
                    <Skeleton className="h-3 w-52" />
                    <Skeleton className="h-3 w-56" />
                    <Skeleton className="h-3 w-52" />
                </CardDescription>
            </CardHeader>
            <CardContent>
                <h3>Top Skills</h3>
                <div className="flex flex-wrap items-center gap-1 gap-y-2 mt-3">
                    <Skeleton className="h-8 w-24 rounded-full" />
                    <Skeleton className="h-8 w-24 rounded-full" />
                    <Skeleton className="h-8 w-24 rounded-full" />
                </div>
            </CardContent>
            <CardFooter>
                <Skeleton className="h-10 w-full" />
            </CardFooter>
        </Card>
    );
}
