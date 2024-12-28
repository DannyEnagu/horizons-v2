'use client';

import React from "react";
import _ from "lodash";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import UserAvatar from "../shared/UserAvatar";
import ExplorationTabs, { ExplorationTab } from "../shared/ExplorationTabs";
import EditWorkExperience, { WorkExperience } from "./EditWorkExperience";
import EditPersonalDetails, { UserEditor } from "./EditPersonalDetails";
import EditProfessionalDetails, { Profile } from "./EditProfessionalDetails";
import { updateUser } from "@/server/actions/user.action";
import { createSocialProfile, updateJobSeekerProfile, updateSocialProfile, updateWorkExperience } from "@/server/actions/profile.action";
import { useToast } from "@/hooks/use-toast";
import Spinner from "../shared/Spinner";


const tabs = [
    { label: "Personal Details", value: "personal", count: 0, isActive: true },
    { label: "Professional Details", value: "professional", count: 0, isActive: false },
    { label: "Work Experience", value: "experience", count: 0, isActive: false },
];

interface EditProfileSheetProps {
    user?: UserEditor;
    profile?: Profile;
    experiences?: WorkExperience[];
    totalYearsExperience?: number | null | undefined;
    userId: string;
}

export default function EditProfileSheet({
    user,
    userId,
    profile,
    experiences,
    totalYearsExperience,
}: EditProfileSheetProps) {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = React.useState<ExplorationTab | null>(tabs[0]);
    const [isSaving, setIsSaving] = React.useState<boolean>(false);
    const [isDataChanged, setIsDataChanged] = React.useState<boolean>(false);
    const [changes, setChanges] = React.useState<Partial<EditProfileSheetProps>>({});

    const [data, setData] = React.useState({
        user,
        profile,
        experiences,
        totalYearsExperience
    });

    const resetChanges = () => {
        setIsSaving(false);
        setIsDataChanged(false);
        setChanges({});
    };

    const handleSubmit = async () => {
        setIsSaving(true);
        if (!changes || Object.keys(changes).length === 0) {
            setIsDataChanged(false);
            setIsSaving(false);
            return;
        }
        if (activeTab?.value === "personal") {
            // Update the profile with the changes
            const userNames = _.pick(changes.user, ['firstName', 'lastName']);
            const  otherDetails = _.pick(changes.user, [ 'email', 'avatar'])

            const userData = Object.keys(userNames).length > 0
                ?   {
                        fullName: `${userNames?.firstName} ${userNames?.lastName}`,
                        ...otherDetails
                    }
                : { ...otherDetails };

            // Update the user profile
            const res =  Object.keys(userData).length > 0 &&
                await updateUser(
                    {
                        id: userId,
                        ...userData
                    }
                );


            const jobSeekerData = _.pick(changes.user, ['phone','location', 'gender']);

            // Update the job seeker profile
            const jobSeekerRes = Object.keys(jobSeekerData).length > 0 &&
                await updateJobSeekerProfile({
                    userId,
                    ...jobSeekerData
                });

            const socials = changes.user?.socials;
            const socialsMedias = socials?.filter((social) => social.username).map((social) => ({
                platform: social.platform,
                url: social.url + social.username
            }));

            // Verify if user has all social profiles
            const isAllSocials = user?.socials?.every((social) => social.username);

            if (user?.socials
                && isAllSocials
                && socials) {
                // Update social profiles
                if (socialsMedias && socialsMedias.length > 0) {
                    const res = await updateSocialProfile({
                        data: socialsMedias,
                        jobSeekerId: profile?.jobSeekerId as string
                    });
                    toast({
                        variant: res.isSuccessful ?  "success" : "destructive",
                        description: res.message,
                    });
                    resetChanges();
                    return;
                }
            } else {
                // Create social profiles
                if (socialsMedias && socialsMedias.length > 0) {
                    const res = await createSocialProfile({
                         data: socialsMedias,
                         jobSeekerId: profile?.jobSeekerId as string
                     });

                    toast({
                        variant: res.isSuccessful ?  "success" : "destructive",
                        description: res.message,
                    });
                    resetChanges();
                    return;
                }

            }

            if (res || jobSeekerRes) {
                toast({
                    variant: (res && res.isSuccessful) || (jobSeekerRes && jobSeekerRes.isSuccessful) ?  "success" : "destructive",
                    description: 'Profile updated successfully',
                });
            } else {
                toast({
                    variant: "destructive",
                    description: "Failed to update user profile as some data is missing",
                });
            }

            resetChanges();
        } else if (activeTab?.value === "professional") {
            // Update the profile with the changes
            const profileData = _.pick(changes.profile, ['headline', 'bio', 'skills']);
            // Update the profile
            const res = await updateJobSeekerProfile({
                userId,
                ...profileData
            });

            toast({
                variant: res.isSuccessful ?  "success" : "destructive",
                description: res.message,
            });
            resetChanges();
        } else if (activeTab?.value === "experience") {
            // Update the experiences with the changes
            const totalYears = changes.totalYearsExperience;
            if (totalYears) {
                const res = await updateJobSeekerProfile({
                    userId,
                    totalYearsExperience: totalYears
                });
                toast({
                    variant: res.isSuccessful ?  "success" : "destructive",
                    description: res.message,
                });
            }
            const experienceData = changes.experiences;
            // Update the experiences
            if (experienceData) {
                const res = await updateWorkExperience(experienceData, userId);
                toast({
                    variant: res.isSuccessful ?  "success" : "destructive",
                    description: res.message,
                });
            }
            resetChanges();
        }

    }

    const handleDataChange = (formData: Partial<EditProfileSheetProps>) => {
        // Compare formData to data and get the difference
        // Update the data with the new formData

        Object.keys(formData).forEach((key) => {
            const dataKey = key as keyof typeof data;
            const formKey = key as keyof typeof formData;

            if (!_.isEqual(data[dataKey], formData[formKey]) && typeof formData[formKey] !== 'object') {
                setChanges({
                    ...changes,
                    [dataKey]: formData[formKey]
                });
                setIsDataChanged(true);
            }
            Object.keys(formData[formKey] || {}).forEach((subKey) => {
                const subDataKey = subKey as keyof typeof data[typeof dataKey];
                const subFormKey = subKey as keyof typeof formData[typeof formKey];
                if (formData[formKey] && data[dataKey]) {
                    if (Array.isArray(data[dataKey])) {
                        // experiences is an arrays
                        // check if the old data is different from the new data
                        if (!_.isEqual(data[dataKey][subDataKey], formData[formKey][subFormKey])) {
                            setChanges({
                                ...changes,
                                [dataKey]: [
                                    ...(Array.isArray(changes[dataKey]) ? changes[dataKey] : []),
                                    formData[formKey][subFormKey]
                                ]
                            });
                            setIsDataChanged(true);
                        }
                    } else if(!_.isEqual(data[dataKey][subDataKey], formData[formKey][subFormKey])) {
                        setChanges({
                            ...changes,
                            [dataKey]: {
                                ...(typeof changes[dataKey] === 'object' ? changes[dataKey] : {}),
                                [subDataKey]: formData[formKey][subFormKey]
                            }
                        });
                        setIsDataChanged(true);
                    }
                }
            })
            
        });

        setData({
            ...data,
            ...formData
        });
    }

    const handlePersonalDetailsChange = (userData: UserEditor) => {
        handleDataChange({ user: userData });
    };

    const handleProfessionalDetailsChange = (profileData: Profile) => {
        handleDataChange({ profile: profileData });
    };

    return (
    <div>
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="secondary" size="sm">
                    Edit Profile
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[90%] bg-light-900 dark:bg-dark-300 border-t-0 flex flex-col pb-0">
                <SheetHeader className="relative text-left">
                    <div className="sm:absolute top-[-50px] left-0 flex flex-col sm:flex-row gap-8">
                        <UserAvatar
                            name={`${user?.firstName} ${user?.lastName}`}
                            avatar={user?.avatar || ''}
                            className="h-24 w-24 rounded-lg"
                        />
                        <div className="sm:self-end">
                            <SheetTitle>
                                Profile
                            </SheetTitle>
                            <p className="text-sm text-light400_light500 mb-1 mt-2">
                                Update your personal and professional details.
                            </p>
                        </div>
                    </div>
                    <SheetDescription className="sr-only">
                        Make changes to your profile here.
                        Click save when you`&apos;`re done.
                    </SheetDescription>
                </SheetHeader>
                <div className="inline-flex items-center justify-end gap-4 mr-8 sm:my-4">
                    <SheetClose asChild>
                        <Button size="sm">
                            Cancel
                        </Button>
                    </SheetClose>
                        <Button
                            size="sm"
                            type="submit"
                            variant="secondary"
                            disabled={isSaving || !isDataChanged}
                            onClick={() => handleSubmit()}
                            className="flex items-center gap-2"
                        >
                            <span>Save changes</span>
                            {isSaving && <Spinner />}
                        </Button>
                </div>
                <div className="overflow-auto border-t-2 border-color">
                    <ExplorationTabs
                        tabs={tabs}
                        onChange={(tab) => setActiveTab(tab)}
                    />
                    <div className="pb-8 pt-6 sm:w-3/4 space-y-4">
                        {/* Personal Details */}
                        {activeTab?.value === "personal" && (<EditPersonalDetails
                            user={user}
                            submit={handlePersonalDetailsChange}
                        />)}
                        {/* Professional Details */}
                        {activeTab?.value === "professional" && (<EditProfessionalDetails
                            profile={profile}
                            submit={handleProfessionalDetailsChange}
                        />)}
                        {/* Work Experience */}
                        {activeTab?.value === "experience" && (<>
                            <EditWorkExperience
                                experiences={experiences || []}
                                totalYearsExperience={totalYearsExperience}
                                userId={userId}
                                submit={handleDataChange}
                            />
                        </>)}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    </div>);
}