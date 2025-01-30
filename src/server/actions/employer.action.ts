"use server";

import prisma from "@/lib/prisma";
import { getUsersByKindeId } from "./user.action";
import { ApplicationStatus } from "@prisma/client";


export const getDashboardDataByEmployerId = async (employerId: string | undefined) => {
    try {
        const user = await getUsersByKindeId(employerId);
        const employerJobs = await prisma.employer.findUnique({
            where: {
                userId: user?.id
            },
            include: {
                jobs: {
                    select: {
                        validUntil: true,
                        applications: true
                    }
                }
            }
        });

        const allApplications = employerJobs?.jobs.map(job => job.applications);
        const applications = allApplications?.filter(app => app.length);
        const shortlisted = applications?.map(app => app.filter(app => app.status === 'OFFERED')).length;
        const postedJobs = employerJobs?.jobs.length;
        const activeJobs = employerJobs?.jobs.filter(job => new Date(job.validUntil
            ? job.validUntil
            : '') < new Date).length;

        const stats = {
            postedJobs,
            activeJobs,
            applications: applications?.length,
            shortlisted
        };
        return {
            message: stats ? "Stats fetched successfully" : "Failed to fetch stats",
            isSuccessful: !!stats,
            result: stats || { postedJobs: 0, activeJobs: 0, applications: 0, shortlisted: 0 }
        };
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }
};

export const getEmployerJobPosts = async (employerId: string | undefined) => {
    try {
        const user = await getUsersByKindeId(employerId);
        const employerJobs = await prisma.job.findMany({
            where: {
                employerId: user?.id
            }
        })

        return employerJobs;
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }
};

export const getJobApplicationsByStatus = async (employerId: string | undefined, status: ApplicationStatus) => {
    try {
        const user = await getUsersByKindeId(employerId);
        const jobs = await prisma.job.findMany({
            where: {
                employerId: user?.id
            },
            include: {
                applications: {
                    where: {
                        status
                    }
                }
            }
        });

        return jobs.map(job => ({
            id: job.id,
            title: job.title,
            location: job.location,
            employmentTypes: job.employmentTypes,
            createdAt: job.createdAt,
            updatedAt: job.updatedAt,
            status: job.applications.find(app => app.jobId === job.id)?.status,
            companyName: job.companyName,
            companyLogo: job.companyLogo,
            description: job.description,
            employerId: job.employerId,
            validUntil: job.validUntil,
            externalSourceID: job.externalSourceID,
            externalSourceUrl: job.externalSourceUrl,
            type: job.type,
            descriptionType: job.descriptionType,
            postedOn: job.postedOn,
            level: job.level,
            categories: job.categories,
        }));
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }
}