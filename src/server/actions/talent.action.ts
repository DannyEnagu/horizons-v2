'use server';

import prisma from "@/lib/prisma";
import { generatePaginationInformation } from "@/lib/utils";
import { JobFilterParams } from "@/types";

export async function getTalents(params: JobFilterParams) {
    try {

        const { page, ...rest } = params;
        // Filter the query params 
        // to remove any empty values
        const getFilteredParams = () => {
            let filterObj = {};
            if (rest.query) {
                filterObj = {
                    ...filterObj,
                    headline: {
                        contains: rest.query,
                        mode: 'insensitive',
                    },
                };
            }
            if (rest.location) {
                filterObj = {
                    ...filterObj,
                    location: {
                        contains: rest.location,
                        mode: 'insensitive',
                    },
                };
            }
            if (rest.level) {
                filterObj = {
                    ...filterObj,
                    totalYearsExperience: {
                        gte: parseInt(rest
                            .level),
                    },
                };
            }

            const filters: {[key: string] : string | unknown}[] = [];
            // Form the array of filters
            if (Object.keys(filterObj).length > 0) {
                Object.entries(filterObj).forEach(([key, value]) => {
                    filters.push({
                        [key]: value,
                    });
                
                });
            }

            return filters;
        }

        const talents = await prisma.jobSeeker.findMany({
            where: {
                AND: getFilteredParams(),
            },
            include: {
                user: true,
                experiences: true,
                socialProfiles: true,
            },
        });

        const data = talents.map((talent) => ({
            profile: {
                id: talent.id,
                headline: talent.headline,
                bio: talent.bio,
                gender: talent.gender,
                skills: talent.skills,
                totalYearsExperience: talent.totalYearsExperience,
                phone: talent.phone,
                location: talent.location,
                userId: talent.userId,
            },
            user: {
                id: talent.user.id,
                fullName: talent.user.fullName,
                email: talent.user.email,
                avatar: talent.user.avatar,
                role: talent.user.role,
            },
            workExperience: talent.experiences,
            socials: talent.socialProfiles,
        }));

        const currentPage = page || 1;
        const paginatedData = data.slice((currentPage - 1) * 20, currentPage * 20);

        const { prevPage, totalPages, nextPage } = generatePaginationInformation(data.length, currentPage);

        return {
            message: paginatedData.length ? 'Talents fetched successfully' : 'No talent found',
            isSuccessful: paginatedData.length > 0,
            result: paginatedData || null,
            totalPages,
            nextPage,
            prevPage,
        };
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }
}