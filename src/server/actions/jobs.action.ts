
// import { JobFilterParams } from "@/types";
// import axios from 'axios';
import { jobs } from '../data'
import { JobFilterParams } from '@/types';

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


export const fetchJobs = async (filters: JobFilterParams) => {
    const { page, ...rest } = filters;
    console.log(filters, 'searchParams');

    const options = {
        method: 'GET',
        url: 'https://linkedin-jobs-api2.p.rapidapi.com/active-jb-7d',
        params: {
            ...rest,
            limit: 10,
            offset: page ? page * 10 : 0,
            description_type: 'text'
        },
        headers: {
            'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY ?? '',
            'x-rapidapi-host': 'linkedin-job-search-api.p.rapidapi.com'
        }
    };
      
    try {
        // const response = await axios.request(options);

        // return response.data.map((job) => ({
        return jobs.map((job) => ({
            id: job.id,
            title: job.title,
            description: job.description_text ? job.description_text : '',
            location: job.locations_derived,
            country: job.countries_derived,
            employmentType: job.employment_type,
            company: job.organization,
            companyLogo: job.organization_logo,
            createdAt: job.date_created,
            postedAt: job.date_posted,
            companyUrl: job.organization_url,
            companyDescription: job.linkedin_org_description,
            url: job.url,
            validUntil: job.date_validthrough,
            source: job.source,
        }));
    } catch (error) {
        console.error(error);
    }
};

export const fetchJobDetails = async (id: string) => {
    try {
        // const response = await axios.request(options);
        // return response.data;
        return jobs.find(job => job.id === id);
    } catch (error) {
        console.error(error);
    }
}