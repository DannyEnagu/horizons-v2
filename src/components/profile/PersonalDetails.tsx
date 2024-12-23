import { JobSeeker, SocialProfile, User } from "@prisma/client";
import UserAvatar from "../shared/UserAvatar";
import { Separator } from "../ui/separator";

interface PersonalDetailsProps {
    user: User;
    otherDetails: JobSeeker | undefined;
    socialLinks: SocialProfile[] | undefined;
};

export default function PersonalDetails({
    user,
    otherDetails,
    socialLinks
}: PersonalDetailsProps) {
    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                <UserAvatar
                    name={user?.fullName}
                    avatar={user?.avatar}
                    className="h-24 w-24 rounded-lg"
                />
                <div>
                    <h2 className="text-xl font-semibold">
                        {user?.fullName}
                    </h2>
                    <p className="text-xs text-light400_light500 mb-1 mt-2">
                        {user?.email || "N/A"}
                    </p>
                    <p className="text-sm text-light400_light500">
                        {otherDetails?.headline}
                    </p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
                <div className="space-y-[1px]">
                    <p>
                        <strong className="text-light400_light500 text-sm">
                            Location:
                        </strong>
                        <span className="ml-2 text-xs">
                            {otherDetails?.location || "N/A"}
                        </span>
                    </p>
                    <p>
                        <strong className="text-light400_light500 text-sm">
                            Phone:
                        </strong>
                        <span className="ml-2 text-xs">
                            {otherDetails?.phone || "N/A"}
                        </span>
                    </p>
                    <p>
                        <strong className="text-light400_light500 text-sm">
                            Gender:
                        </strong>
                        <span className="ml-2 text-xs">
                            {otherDetails?.gender || "N/A"}
                        </span>
                    </p>
                    <p>
                        <strong className="text-light400_light500 text-sm">
                            Social:
                        </strong>
                        <span className="ml-2 text-xs space-x-3">
                            {socialLinks?.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 capitalize"
                                >
                                    {link.platform}
                                </a>
                            ))}
                            {socialLinks?.length === 0 && "N/A"}
                        </span>
                    </p>
                </div>
                <Separator orientation="vertical" className="hidden sm:block h-[100px]" />
                <div className="w-3/4">
                    <h3 className="text-lg font-semibold">About</h3>
                    <p className="text-light400_light500 mt-2 paragraph-semibold">
                        {otherDetails?.bio ? otherDetails.bio : "No about section yet."}
                    </p>
                </div>
            </div>
        </>
    );
}