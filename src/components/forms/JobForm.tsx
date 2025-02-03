'use client';

import { useState } from "react";
import { Button } from "../ui/button";
import InputWrapper from "../profile/InputWrapper";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import UserAvatar from "../shared/UserAvatar";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import Spinner from "../shared/Spinner";
import { getEmployerByUserId, getExistingUserOrCreateNewUser, updateUser, createEmployer } from "@/server/actions/user.action";
import { User } from "@prisma/client";
import JobPreview from "../dailogs/JobPreview";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { createNewJob } from "@/server/actions/jobs.action";
import dayjs from "dayjs";

interface Job {
    title: string;
    description: string;
    location: string;
    salary: string;
    jobLevel: string;
    validThrough: string;
}



export default function JobForm() {
    const { toast } = useToast();
    const [isPosting, setIsPosting] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [error, setError] = useState({
        message: "",
        field: ""
    });
    const [isCompanyFound, setIsCompanyFound] = useState<boolean>(false);
    const [job, setJob] = useState<Job>({
        title: "",
        jobLevel: "",
        location: "",
        validThrough: dayjs(new Date).add(30, 'day').format('YYYY-MM-DD'),
        description: "",
        salary: "",
    });

    const [company, setCompany] = useState({
        companyName: "",
        companyLogo: "",
        companyWebsite: "",
        companyDescription: "",
        loading: false,
    });

    const [employmentType, setEmploymentType] = useState<string[]>([]);

    async function getUserInfo() {
        if (!userInfo) {
            const { user } = await getExistingUserOrCreateNewUser();
            setUserInfo(user)
            return user
        }
        return userInfo
    }

    async function findCompany() {
        if (!company.companyName) {
            return
        }
        setIsCompanyFound(false)
        setCompany((prevCompany) => ({
            ...prevCompany,
            loading: true
        }))

        const userInfo = await getUserInfo();

        const userId = userInfo?.id as string
        const employer = await getEmployerByUserId(userId);

        if (employer.isSuccessful) {
            setCompany((prevCompany) => ({
                ...prevCompany,
                companyName: employer.result?.companyName as string,
                companyLogo: employer.result?.companyLogo as string,
                companyWebsite: employer.result?.website as string,
                loading: false
            }))
        }
        setIsCompanyFound(employer.isSuccessful)
    }

    function handleCompanyChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setCompany((prevCompany) => ({
        ...prevCompany,
        [name]: value,
        }));
    }
    
    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setJob((prevJob) => ({
        ...prevJob,
        [name]: value,
        }));
    }

    function handleEmploymentTypeChange(value: string) {
        setEmploymentType((prevEmploymentType) => {
            if (prevEmploymentType.includes(value)) {
                return prevEmploymentType.filter((type) => type !== value);
            }
            return [...prevEmploymentType, value];
        });
    }

    async function postJob() {
        setIsPosting(true);
        const employer = await getEmployerByUserId(userInfo?.id as string);
        // Post job to the server
        const newJob =  await createNewJob({
            employerId: employer.result?.id as string,
            title: job.title,
            description: job.description,
            location: job.location,
            type: '',
            employmentTypes: employmentType.join(', '),
            descriptionType: 'html',
            validUntil: new Date(job.validThrough),
            postedOn: new Date(),
            level: job.jobLevel,
            companyName: company.companyName,
            companyLogo: company.companyLogo,
        });

        if (newJob.isSuccessful) {
            toast({
                variant: 'success',
                title: 'Success',
                description: 'Job posted successfully.',
            })
            setIsPosting(false);
            return;
        }
        toast({
            variant: 'destructive',
            title: 'Failed',
            description: newJob.message,
        })
        setIsPosting(false);
    }

    async function makeEmployer() {
        // Update user role to employer
        const res = await updateUser({
            id: userInfo?.id as string,
            role: 'EMPLOYER'
        })

        if (res.isSuccessful) {
            toast({
                variant: 'success',
                title: 'Success',
                description: 'You are now an employer.',
            })
            await getUserInfo();
        }

        // create employer
        const employer = await createEmployer({
            userId: userInfo?.id as string,
            companyName: company.companyName,
            companyLogo: company.companyLogo,
            website: company.companyWebsite,
        });

        if (employer.isSuccessful) {
            toast({
                variant: 'success',
                title: 'Success',
                description: 'Employer record created successfully.',
            })
            setCompany((prevCompany) => ({
                ...prevCompany,
                companyName: employer.result?.companyName as string,
                companyLogo: employer.result?.companyLogo as string,
                companyWebsite: employer.result?.website as string,
                loading: false
            }))
            setIsCompanyFound(true)
        }
        await postJob();
    }
    
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        if (!validateRequiredFields()) {
            return
        }

        if (!checkUserEligibility()) {
            return
        }

        postJob();
    }

    function checkUserEligibility() {
        if (userInfo?.role !== 'EMPLOYER') {
            toast({
                title: 'Not Yet An Employer',
                description: 'You are not authorized to post a job.',
                action: <ToastAction
                    className="border !border-[#14A800]"
                    altText="Become An Employer"
                    onClick={makeEmployer}
                > Become An Employer </ToastAction>,
            })
            return true;
        }
        return true;
    }

    function validateRequiredFields () {
        for (const key in job) {
            const value = job[key as keyof Job]
            if (!value && key !== 'salary') {
                setError({
                    ...error,
                    message: `${key.charAt(0).toUpperCase() + key.slice(1)} field is required.`,
                    field: key
                })
                return false;
            }
        }
        if (!company.companyName) {
            setError({
                ...error,
                message: `Company name field Can not be empty.`,
                field: 'companyName'
            })
            return false;
        }
        if (!employmentType.length) {
            setError({
                ...error,
                message: `Employment Type field Can not be empty.`,
                field: 'employmentType'
            })
            return false;
        }
        setError({
            ...error,
            message: "",
            field: ""
        })
        return true;
    }

    function handleSelectChange(value: string) {
        setJob((prevJob) => ({
            ...prevJob,
            jobLevel: value,
        }));
    }

    function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (files) {
            const reader = new FileReader();
            reader.onload = () => {
                setCompany((prevCompany) => ({
                    ...prevCompany,
                    companyLogo: reader.result as string,
                }));
            };
            reader.readAsDataURL(files[0]);
        }
    }

    const generateHTMLdescription = () => {
        return `
            <b>Salary Range: ${job.salary}</b>
            <br />
            <br />
            <h2><b>Company Description</b></h2>
            <br />
            <p>${company.companyDescription}</p>
            <br />
            <h2><b>Job Description</b></h2>
            <br />
            <p>${job.description}</p>
            <br />
            <br />
        `;
    }
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4 md:w-[60%]">
            <InputWrapper
                label="Position or Title"
                labelFor="title"
                asCol
                required
            >
                <Input 
                    type="text"
                    name="title"
                    value={job.title}
                    onChange={handleChange}
                />
            </InputWrapper>
            {/* job level */}
            <InputWrapper
                label="Job Level"
                labelFor="jobLevel"
                asCol
                required
            >
                <Select onValueChange={handleSelectChange}>
                    <SelectTrigger>
                        <SelectValue
                            placeholder="Select Job Level"
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {[
                            "Internship",
                            "Junior Level",
                            "Entry Level",
                            "Mid Level",
                            "Senior Level",
                            "Director",
                            "Executive",
                            "Manager",
                            "CEO",
                        ].map((type) => (
                            <SelectItem
                                key={type}
                                value={type}
                            >
                                {type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </InputWrapper>
            {/* job location */}
            <InputWrapper
                label="Location"
                labelFor="location"
                asCol
                required
            >
                <Input 
                    type="text"
                    name="location"
                    placeholder="City, Country"
                    value={job.location}
                    onChange={handleChange}
                />
            </InputWrapper>

            {/* job salary */}
            <InputWrapper
                label="Salary"
                labelFor="salary"
                asCol
            >
                <Input 
                    type="text"
                    name="salary"
                    placeholder="e.g. $1000 - $2000"
                    value={job.salary}
                    onChange={handleChange}
                />
            </InputWrapper>
            {/* job employment type */}
            <InputWrapper
                label="Employment Type"
                labelFor="employmentType"
                asCol
                required
            >
                <ul className="grid grid-cols-2 gap-2">
                    <li>
                        <Label htmlFor="full-time" className="flex items-center gap-3">
                            <Checkbox
                                id="full-time"
                                onCheckedChange={() => handleEmploymentTypeChange('Full-time')}
                            />
                            <span>
                                Full-time
                            </span>
                        </Label>
                    </li>
                    <li>
                        <Label htmlFor="part-time" className="flex items-center gap-3">
                            <Checkbox
                                id="part-time"
                                onCheckedChange={() => handleEmploymentTypeChange('Part-time')}
                            />
                            <span>
                                Part-time
                            </span>
                        </Label>
                    </li>
                    <li>
                        <Label htmlFor="remote" className="flex items-center gap-3">
                            <Checkbox
                                id="remote"
                                onCheckedChange={() => handleEmploymentTypeChange('remote')}
                            />
                            <span>
                                Remote
                            </span>
                        </Label>
                    </li>
                    <li>
                        <Label htmlFor="on-site" className="flex items-center gap-3">
                            <Checkbox
                                id="on-site"
                                onCheckedChange={() => handleEmploymentTypeChange('On-site')}
                            />
                            <span>
                                On-site
                            </span>
                        </Label>
                    </li>
                </ul>
            </InputWrapper>
            {/* job valid through */}
            <InputWrapper
                label="Valid Through"
                labelFor="validThrough"
                asCol
                required
            >
                <Input 
                    type="date"
                    name="validThrough"
                    value={job.validThrough}
                    onChange={handleChange}
                />
            </InputWrapper>
            {/* job description */}
            <InputWrapper
                label="Job Description"
                labelFor="description"
                asCol
                required
            >
                <Textarea
                    name="description"
                    value={job.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-200 rounded-md"
                    rows={10}
                />
            </InputWrapper>
            {/* Company Details */}
            <h3 className="text-center uppercase font-bold mt-8">
                Company Details
            </h3>
            {/* company name */}
            <InputWrapper
                label="Company Name"
                labelFor="companyName"
                optionalText="Company Name should be entered in the same way it appears on employer's profile."
                asCol
                required
            >
                <Input 
                    type="text"
                    name="companyName"
                    value={company.companyName}
                    onChange={handleCompanyChange}
                    onBlur={findCompany}
                />
                {company.loading && <Spinner size="sm" />}
            </InputWrapper>
            {/* Only render when Company is not found */}
            {(company.companyName &&
                !company.loading &&
                !isCompanyFound
            ) && <>
                {/* company logo */}
                <InputWrapper
                    label="Company Logo"
                    labelFor="companyLogo"
                    asCol
                >
                    <div className="flex items-center gap-8">
                        <UserAvatar
                            name="Company Logo"
                            avatar={company.companyLogo}
                            className="h-20 w-20 rounded-lg"
                        />
                        <Label htmlFor="logoPicker" className="flex-1 flex items-center justify-center gap-1 h-20 w-20 rounded-lg border border-color cursor-pointer px-3 hover:ring-2 hover:ring-slate-950 hover:ring-offset-2">
                            <strong className="underline">Click to upload</strong> <span className="text-muted">
                            or drag and drop a new image.
                            </span>
                        </Label>
                        <Input
                            type="file"
                            id="logoPicker"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e)}
                        />
                    </div>
                </InputWrapper>
                {/* company website */}
                <InputWrapper
                    label="Company Website"
                    labelFor="companyWebsite"
                    asCol
                >
                    <Input 
                        type="text"
                        name="companyWebsite"
                        value={company.companyWebsite}
                        onChange={handleCompanyChange}
                    />
                </InputWrapper>
                {/* company description */}
                <InputWrapper
                    label="Company Description"
                    labelFor="companyDescription"
                    asCol
                >
                    <Textarea
                        name="companyDescription"
                        value={company.companyDescription}
                        onChange={handleCompanyChange}
                        className="w-full p-2 border border-gray-200 rounded-md"
                        rows={5}
                    />
                </InputWrapper>
            </>}
            {error.message && <p className="text-sm text-red-500">
                {error.message}
            </p>}
            <div className="flex items-center justify-end gap-3 !mt-8 md:w-3/4 md:mx-auto">
                <JobPreview
                    jobDetails={{
                        title: job.title,
                        companyName: company.companyName,
                        companyWebSite: company.companyWebsite,
                        location: job.location,
                        employmentTypes: employmentType.join(', '),
                        level: job.jobLevel,
                        postedOn: new Date().toISOString(),
                        validUntil: job.validThrough,
                        description: generateHTMLdescription(),
                    }}
                    onCancel={() => {}}
                    onPostJob={() => checkUserEligibility()}
                />
                <Button
                    type="submit"
                    variant="secondary"
                    size="sm"
                    disabled={isPosting}
                >
                    Post Job
                    {isPosting && <Spinner size="sm" />}
                </Button>
            </div>
        </form>
    );
}