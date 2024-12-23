'use server';

import prisma from "@/lib/prisma";
import { Experience, JobSeeker, SocialProfile } from "@prisma/client";


export const createJobSeekerProfile = async (data: Omit<JobSeeker, 'id'>) => {
    try {
        const jobSeekerExists = await prisma.jobSeeker.findFirst({
            where: {
                userId: data.userId
            }
        });

        if (!jobSeekerExists) {
            const newJobSeeker = await prisma.jobSeeker.create({
                data: {
                    userId: data.userId
                }
            });
    
            return {
                message: newJobSeeker ? "Job Seeker Profile created successfully" : "Failed to create Job Seeker Profile",
                isSuccessful: !!newJobSeeker,
                result: newJobSeeker || null
            };
        }
        
        return {
            message: jobSeekerExists ? "Job Seeker Profile created successfully" : "Failed to create Job Seeker Profile",
            isSuccessful: !!jobSeekerExists,
            result: jobSeekerExists || null
        };
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }
}

export const updateJobSeekerProfile = async (data: Partial<JobSeeker>) => {
    try {
        const existingJobSeeker = await createJobSeekerProfile(data as Omit<JobSeeker, 'id'>);

        if (!existingJobSeeker.isSuccessful) {
            return {
                message: "Failed to update Profile",
                isSuccessful: false,
                result: null
            };
        }

        const jobSeeker = await prisma.jobSeeker.update({
            where: {
                userId: data.userId
            },
            data: {
                ...data
            }
        });

        return {
            message: jobSeeker ? "Profile updated successfully" : "Failed to update Profile",
            isSuccessful: !!jobSeeker,
            result: jobSeeker || null
        };
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }
}


export const createWorkExperience = async (experiences: Omit<Experience, 'id' | 'jobSeekerId'>, userId: string) => {
    try {

        const existingExperience = await prisma.experience.findFirst({
            where: {
                company: experiences.company,
                term: experiences.term
            }
        });

        if (existingExperience) {
            return {
                message: "Work Experience already exists",
                isSuccessful: false,
                result: existingExperience
            };
        }

        const jobSeeker = await prisma.jobSeeker.findUnique({
            where: {
                userId
            }
        });
        if (!jobSeeker) {
            const newJobSeeker = await prisma.jobSeeker.create({
                data: {
                    userId
                }
            });

            const newExperience = await prisma.experience.create({
                data: {
                    ...experiences,
                    jobSeekerId: newJobSeeker.id
                }
            });

            return {
                message: newExperience ? "Work Experience added successfully" : "Failed to add Work Experience",
                isSuccessful: !!newExperience,
                result: newExperience || null
            };
        }

        const newExperience = await prisma.experience.create({
            data: {
                ...experiences,
                jobSeekerId: jobSeeker.id
            }
        });
        return {
            message: newExperience ? "Work Experience added successfully" : "Failed to add Work Experience",
            isSuccessful: !!newExperience,
            result: newExperience || null
        };
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }
}

export const updateWorkExperience = async (experiences: Partial<Experience>[], userId: string) => {
    try {
        const jobSeeker = await prisma.jobSeeker.findUnique({
            where: {
                userId
            }
        });

        if (!jobSeeker) {
            const newJobSeeker = await prisma.jobSeeker.create({
                data: {
                    userId
                }
            });

            experiences.forEach(async item => {
                await prisma.experience.updateMany({
                    where: {
                        jobSeekerId: newJobSeeker.id
                    },
                    data: {
                        ...item
                    }
                });
            });

            const experience = await prisma.experience.findMany({
                where: {
                    jobSeekerId: newJobSeeker.id
                }
            });

            return {
                message: experience ? "Work Experience updated successfully" : "Failed to update Work Experience",
                isSuccessful: !!experience,
                result: experience || null
            };
        }

        experiences.forEach(async item => {
            await prisma.experience.updateMany({
                where: {
                    jobSeekerId: jobSeeker?.id
                },
                data: {
                    ...item
                }
            });
        });

        const experience = await prisma.experience.findMany({
            where: {
                jobSeekerId: jobSeeker?.id
            }
        });

        return {
            message: experience ? "Work Experience updated successfully" : "Failed to update Work Experience",
            isSuccessful: !!experience,
            result: experience || null
        };
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }
}

export const createSocialProfile = async (
    { data, jobSeekerId }: { data: Omit<SocialProfile, 'id' | 'jobSeekerId'>[], jobSeekerId: string }
) => {
    try {
        const socialProfile = await prisma.socialProfile.createMany({
            data: data.map(item => ({
                ...item,
                jobSeekerId
            }))
        });

        return {
            message: socialProfile ? "Social Profile added successfully" : "Failed to add Social Profile",
            isSuccessful: !!socialProfile,
            result: socialProfile || null
        };
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }
}

export const updateSocialProfile = async ({ data, jobSeekerId}: { data: Partial<SocialProfile>[], jobSeekerId: string}) => {
    try {

        data.forEach(async item => {
            await prisma.socialProfile.updateMany({
                where: {
                    jobSeekerId,
                    platform: item.platform
                },
                data: {
                    ...item
                }
            });
        });

        const socialProfile = await prisma.socialProfile.findMany({
            where: {
                jobSeekerId
            }
        });

        return {
            message: socialProfile ? "Social Profile updated successfully" : "Failed to update Social Profile",
            isSuccessful: !!socialProfile,
            result: socialProfile || null
        };
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }
}
