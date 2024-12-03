
// import { JobFilterParams } from "@/types";
import axios from 'axios';
// import { jobs } from '../data'
import { JobFilterParams } from '@/types';
import { parseHtmlString } from '@/lib/utils';

export const fetchLocation = async () => {
    const response = await fetch('http://ip-api.com/json/?fields=country');
    return await response.json();;
};
  
export const fetchCountries = async () => {
    try {
        // const response = await fetch('https://restcountries.com/v3.1/all'); // This API is not working at the moment
        const response = await fetch('https://restcountries.com/v3.1/region/africa');
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

type JobAPIResponse = {
    [key: string]: string | number | string[] | object | object[];
    refs: {
        landing_page: string;
    };
    company: {
        name: string;
    };
    locations: {
        name: string;
    }[];
    employmentTypes: string[];
}

export const fetchJobs = async (filters: JobFilterParams) => {
    // const { page, ...rest } = filters;
    console.log(filters, 'searchParams');

    const options = {
        method: 'GET',
        url: 'https://www.themuse.com/api/public/jobs',
        // url: 'https://linkedin-jobs-api2.p.rapidapi.com/active-jb-7d',
        params: {
            page: 1,
            // ...rest,
            // limit: 10,
            // offset: page ? page * 10 : 0,
            // description_type: 'text'
        },
        headers: {
            'api_key': process.env.THE_MUSE_API_KEY ?? '',
        }
    };
      
    try {
        const response = await axios.request(options);

        console.log(response.data, 'New Api Data');
        const { results, page, page_count } = response.data;

        // return response.data.map((job) => ({
        const jobs = results.map((job: JobAPIResponse) => ({
            id: job.id,
            title: job.name,
            type: job.type,
            description: parseHtmlString(job.contents as string),
            location: job.locations.map(location => location.name),
            categories: job.categories,
            levels: job.levels,
            // country: job.countries_derived,
            // employmentType: job.employment_type,
            company: job.company.name,
            // companyLogo: job.organization_logo,
            // createdAt: job.date_created,
            postedAt: job.publication_date,
            // companyUrl: job.organization_url,
            // companyDescription: job.linkedin_org_description,
            url: job.refs.landing_page,
            // validUntil: job.date_validthrough,
            // source: job.source,
            tags: job.tags,
        }));
        return { jobList: jobs, page, page_count };
    } catch (error) {
        console.error(error);
    }
};
    

export const fetchJobDetails = async (id: string) => {
    try {
        const options = {
            method: 'GET',
            url: `https://www.themuse.com/api/public/jobs/${id}`,
            headers: {
                'api_key': process.env.THE_MUSE_API_KEY ?? '',
            }
        };
        const response = await axios.request(options);
        console.log(response.data, 'Job Details');
        const jobDetails: JobAPIResponse = response.data;
        return {
            id: jobDetails.id,
            title: jobDetails.name,
            type: jobDetails.type,
            description: jobDetails.contents,
            location: jobDetails.locations.map(location => location.name),
            categories: jobDetails.categories,
            levels: jobDetails.levels,
            company: jobDetails.company.name,
            employmentTypes: jobDetails.employmentTypes || [],
            companyUrl: jobDetails.refs.landing_page,
            postedAt: jobDetails.publication_date,
            url: jobDetails.refs.landing_page,
            validUntil: jobDetails.validUntil || '',
            tags: jobDetails.tags,
        };
    } catch (error) {
        console.error(error);
    }
};