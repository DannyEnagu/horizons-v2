"use server";
import axios from 'axios';
import { JobFilterParams } from '@/types';
import { parseHtmlString } from '@/lib/utils';
import { JobAPIResponse, SaveJobType } from '@/types/jobs';
import prisma from '@/lib/prisma';
import { Job } from '@prisma/client';

export const fetchLocation = async () => {
    const response = await fetch('http://ip-api.com/json/?fields=country');
    return await response.json();
};
  
export const fetchCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v2/all');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

export const fetchJobs = async (filters: JobFilterParams) => {


    const options = {
        method: 'GET',
        url: 'https://www.themuse.com/api/public/jobs',
        params: {
            ...filters,
        },
        headers: {
            'api_key': process.env.THE_MUSE_API_KEY ?? '',
        }
    };
      
    try {
        const response = await axios.request(options);
        const { results, page, page_count } = response.data;

        const jobs = results.map((job: JobAPIResponse) => ({
            id: job.id,
            externalSourceID: job.id,
            title: job.name,
            type: job.type,
            description: parseHtmlString(job.contents as string),
            location: job.locations.map(location => location.name).join(', '),
            categories: job.categories.map(category => category.name).join(', '),
            level: job.levels.map(level => level.name).join(', '),
            externalSourceUrl: job.refs.landing_page,
            companyName: job.company.name,
            employmentType: job.employmentTypes || [],
            postedOn: job.publication_date,
            validUntil: job.validUntil || '',
        }));
        return { jobList: jobs, page, page_count };
    } catch (error) {
        console.error(error);
    }
};
    

export const fetchJobDetailsFromAPI = async (id: string) => {
    try {
        const options = {
            method: 'GET',
            url: `https://www.themuse.com/api/public/jobs/${id}`,
            headers: {
                'api_key': process.env.THE_MUSE_API_KEY ?? '',
            }
        };
        const response = await axios.request(options);
        const jobDetails: JobAPIResponse = response.data;
        return {
            id: jobDetails.id,
            externalSourceID: jobDetails.id,
            title: jobDetails.name,
            type: jobDetails.type,
            description: jobDetails.contents,
            location: jobDetails.locations.map(location => location.name).join(', '),
            categories: jobDetails.categories.map(category => category.name).join(', '),
            level: jobDetails.levels.map(level => level.name).join(', '),
            companyName: jobDetails.company.name,
            employmentTypes: jobDetails.employmentTypes || '',
            externalSourceUrl: jobDetails.refs.landing_page,
            postedOn: jobDetails.publication_date,
            validUntil: jobDetails.validUntil || '',
            createdAt: '',
            updatedAt: '',
            employerId: '',
            companyLogo: '',
            descriptionType: 'html',
        };
    } catch (error) {
        console.error(error);
    }
};

export const fetchJobDetails = async (id: string) => {
    try {
        const job = await prisma.job.findFirst({
            where: {
                id
            }
        });
        if (job) {
            return {
                message: 'Success',
                isSuccessful: true,
                result: job
            };
        }
        const jobDetails = await fetchJobDetailsFromAPI(id);

        return {
            message: !jobDetails ? 'Job not found' : 'Success',
            result: {...jobDetails}
        };
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }
}

const createTheMuseJob = async (job: Job) => {
    try {
        const newJob = await prisma.job.create({
            data: {
                ...job,
            }
        });
        return newJob;
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }
};


const checkSavedJob = async (jobId: Job['id'], jobSeekerId: string) => {
    const savedJob = await prisma.savedJob.findFirst({
        where: {
            jobId,
            jobSeekerId,
        }});
    return savedJob;
}

const saveJobForUser = async (jobId: Job['id'], jobSeekerId: string) => {
    const saved = await checkSavedJob(jobId, jobSeekerId);
    if (!saved) {
        const savedJob = await prisma.savedJob.create({
            data: {
                job: {
                    connect: {
                        id: jobId
                    }
                },
                jobSeeker: {
                    connect: {
                        id: jobSeekerId
                    }
                }
            }
        });
        return savedJob;
    }
    return;
}

export const saveJob = async ({job, userId}: SaveJobType) => {
    try {
        const { id, ...rest } = job;
        const jobExists = await prisma.job.findFirst({
            where: {
                id: id,
                OR: [
                    { externalSourceID: rest?.externalSourceID },
                ]
            }
        });
        const jobSeekerExists = await prisma.jobSeeker.findFirst({
            where: {
                userId
            }
        });
        if (jobExists && jobSeekerExists) {
            const saveJob = await saveJobForUser(jobExists.id, jobSeekerExists.id);
            return {
                message: saveJob ? 'Job saved successfully' : 'Job not saved Or already saved',
                isSuccessful: !!saveJob,
                result: saveJob || null
            }
        }
        if (!jobExists && jobSeekerExists) {
            const newJob = await createTheMuseJob(job);
            const saveJob = await saveJobForUser(newJob.id, jobSeekerExists.id);
            return {
                message: saveJob ? 'Job saved successfully' : 'Job not saved Or already saved',
                isSuccessful: !!saveJob,
                result: saveJob || null
            }
        }

        if(!jobSeekerExists && jobExists) {
            const newJobSeeker = await prisma.jobSeeker.create({
                data: {
                    userId
                }
            });
            const saveJob = await saveJobForUser(jobExists.id, newJobSeeker.id);
            return {
                message: saveJob ? 'Job saved successfully' : 'Job not saved Or already saved',
                isSuccessful: !!saveJob,
                result: saveJob || null
            }
        }

        const newJob = await createTheMuseJob(job);
        const newJobSeeker = await prisma.jobSeeker.create({
            data: {
                userId
            }
        });
        const saveJob = await saveJobForUser(newJob.id, newJobSeeker.id);
        return {
            message: saveJob ? 'Job saved successfully' : 'Job not saved Or already saved',
            isSuccessful: !!saveJob,
            result: saveJob || null
        }
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }
}

type NewJob = Omit<Job,
    'id' |
    'createdAt' |
    'updatedAt' |
    'externalSourceID' |
    'categories' |
    'externalSourceUrl'
>;

export const createNewJob = async (job: NewJob) => {
    try {
        const newJob = await prisma.job.create({
            data: {
                ...job,
            }
        });
        return {
            message: newJob ?  'Job created successfully' : 'Job not created',
            isSuccessful: !!newJob,
            result: newJob || null
        };
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }
}

export const getJobSeekerProfile = async (userId: string) => {
    try {
        // Include
        // Saved Jobs and Job Applications
        // experiences, socialProfiles
        const jobSeeker = await prisma.jobSeeker.findFirst({
            where: {
                userId
            },
            include: {
                experiences: {},
                socialProfiles: {},
                savedJobs: {
                    include: {
                        job: true
                    }
                },
                applications: {
                    include: {
                        job: true
                    }
                },
            }
        });

        if (!jobSeeker) {
            return {
                message: 'Job Seeker Profile Not Found',
                isSuccessful: false,
                result: null
            };
        }

        const data = {
            ...jobSeeker,
            applications: jobSeeker.applications.map(application => ({
                dateTime: application.createdAt.toString(),
                jobId: application.jobId,
                jobTitle: application.job.title,
                status: application.status
            })),
            savedJobs: jobSeeker.savedJobs.map(savedJob => ({
                dateTime: savedJob.createdAt.toString(),
                jobId: savedJob.jobId,
                jobTitle: savedJob.job.title,
                status: 'Saved'
            }))
        };

        return {
            message: 'Success',
            isSuccessful: true,
            result: data
        };
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }
}