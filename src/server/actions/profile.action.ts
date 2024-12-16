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
                    ...data
                }
            });
            return {
                message: newJobSeeker ? "Job Seeker Profile created successfully" : "Failed to create Job Seeker Profile",
                isSuccessful: !!newJobSeeker,
                result: newJobSeeker || null
            };
        }

        const newJobSeeker = await prisma.jobSeeker.create({
            data: {
                ...data
            }
        });

        return {
            message: newJobSeeker ? "Job Seeker Profile created successfully" : "Failed to create Job Seeker Profile",
            isSuccessful: !!newJobSeeker,
            result: newJobSeeker || null
        };
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }
}

type JobSeekerUpdateType = {
    userId: string;
    headline?: string | null;
    bio?: string | null;
    skills?: string[];
    location?: string | null;
    phone?: string | null;
    gender?: string | null;
    totalYearsExperience?: number | null;
}

export const updateJobSeekerProfile = async (data: JobSeekerUpdateType) => {
    try {
        const jobSeeker = await prisma.jobSeeker.update({
            where: {
                userId: data.userId
            },
            data: {
                ...data
            }
        });

        return {
            message: jobSeeker ? "Job Profile updated successfully" : "Failed to update Profile",
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

export const createSocialProfile = async (data: Omit<SocialProfile, 'id'>[]) => {
    try {
        const socialProfile = await prisma.socialProfile.createMany({
            data: {
                ...data
            }
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

type SocialProfileUpdateType = {
    jobSeekerId?: string;
    platform?: string;
    url?: string;
}

export const updateSocialProfile = async (data: SocialProfileUpdateType[]) => {
    try {
        const socialProfile = await prisma.socialProfile.updateMany({
            where: {
                id: data[0].platform
            },
            data: {
                ...data
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
