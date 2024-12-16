'use client';

import React from "react";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ComboboxDropdownMenu } from "../shared/ComboboxDropdownMenu";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import InputWrapper from "./InputWrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { createWorkExperience, updateJobSeekerProfile } from "@/server/actions/profile.action";
import { revalidatePath } from "next/cache";

export interface WorkExperience {
    company: string;
    designation: string;
    jobType: string;
    term: string;
    summary: string;
}

type TotalYearsExperience = number | null | undefined;

interface EditWorkExperienceProps {
    experiences: WorkExperience[] | [];
    totalYearsExperience: TotalYearsExperience;
    userId: string;
    submit: ({}: {
        experiences: WorkExperience[];
        totalYearsExperience: TotalYearsExperience
    }) => void;
}


export default function EditWorkExperience(
    { experiences, submit, totalYearsExperience, userId}: EditWorkExperienceProps
) {
    const [isSaving, setIsSaving] = React.useState(false);
    const [selectedExperience, setSelectedExperience] = React.useState<WorkExperience | null>(experiences[0]);
    const { toast } = useToast();

    const [works, setWorks] = React.useState<WorkExperience[]>([]);

    const [data, setData] = React.useState({
        company: experiences[0]?.company || '',
        designation: experiences[0]?.designation || '',
        term: experiences[0]?.term || '',
        summary: experiences[0]?.summary || '',
        totalYears: totalYearsExperience || 0,
        jobType: experiences[0]?.jobType || '',
    });

    React.useEffect(() => {
        setSelectedExperience(works[0] || null);
    }, [works]);

    // const handleSelectExperience = (experience: WorkExperience) => {
    //     setSelectedExperience(experience);
    // }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({
            ...data,
            [e.target.name]:  e.target.value,
        });
    }

    const handleSelectChange = (value: string) => {
        setData({
            ...data,
            jobType: value,
        });
        const exps = [];
        exps.push({...data, jobType: value});
        submit({
            experiences: exps,
            totalYearsExperience: data.totalYears,
        });
    }

    const handleCallback = () => {
        if (works.length > 0) {
            submit({
                experiences: works,
                totalYearsExperience: data.totalYears,
            });
            return;
        }
        const exps = [];
        exps.push(data);
        submit({
            experiences: exps,
            totalYearsExperience: data.totalYears,
        });
    }

    const addExperience = async () => {
        setIsSaving(true);
        setWorks(prev => [...prev, {...data}])
        const res = await createWorkExperience({
            company: data.company,
            designation: data.designation,
            term: data.term,
            summary: data.summary,
            jobType: data.jobType,
            jobTitle: data.designation,
        }, userId);

        await updateJobSeekerProfile({
            userId,
            totalYearsExperience: data.totalYears,
        })

        if (res.isSuccessful) {
            setIsSaving(false);
            toast({
                variant: "success",
                description: res.message,
            })
            clearData();
            revalidatePath('/profile');
            return;
        }
        setIsSaving(false);
        toast({
            variant: "destructive",
            description: res.message,
        })
    }

    const clearData = () => {
        setData({
            company: '',
            designation: '',
            term: '',
            summary: '',
            totalYears: 0,
            jobType: '',
        });
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4 mb-8">
                {works.length > 0 && (
                <>
                    <div className="flex w-full flex-col items-start justify-between rounded-md border py-1 px-3 sm:flex-row sm:items-center">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-8 text-sm font-medium leading-none">
                            <span className="underline">
                                {selectedExperience?.designation}
                            </span>
                            <span>
                                @ <strong>
                                    {selectedExperience?.company}
                                </strong>
                            </span>
                            <Badge className="rounded-lg text-center self-start">
                                {selectedExperience?.term}
                            </Badge>
                        </div>
                        <ComboboxDropdownMenu
                            itemId="experience"
                            label="Add Experience"
                            showLabels
                            setLabel={() => {}}
                            onDelete={() => {}}
                        />
                    </div>
                </>)}
                <Button
                    variant="secondary"
                    size="sm"
                    disabled={!data.company
                        || !data.designation
                        || !data.term
                        || !data.summary
                        || !data.totalYears
                        || !data.jobType
                    }
                    onClick={() => addExperience()}
                >
                    {isSaving ? <Loader /> : 'Add Experience'}
                </Button>
            </div>
            <div className="space-y-4">
                <InputWrapper label="Company Name" labelFor="company">
                    <Input
                        type="text"
                        id="company"
                        placeholder="Company Name"
                        name="company"
                        value={data.company}
                        onChange={handleChange}
                        onBlur={handleCallback}
                    />
                </InputWrapper>
                <InputWrapper label="Job Title" labelFor="jobTitle">
                    <Input
                        type="text"
                        id="jobTitle"
                        placeholder="Job Title"
                        name="designation"
                        value={data.designation}
                        onChange={handleChange}
                        onBlur={handleCallback}
                    />
                </InputWrapper>
                <InputWrapper
                    label="Employment type"
                    labelFor="jobType"
                    optionalText="Specify the type of employment (e.g. Full-time, Part-time)"
                >
                    <Select onValueChange={handleSelectChange}>
                        <SelectTrigger>
                            <SelectValue
                                placeholder="Previous Employment Type"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {[
                            'Full-time',
                            'Part-time',
                            'Hybrid',
                            'Contract',
                            'Internship',
                            'Freelance',
                            'Temporary',
                            'flexible/remote',
                            'Volunteer',
                            'Apprenticeship',
                            'Seasonal',
                            'Trainee',
                            'Others'
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
                <InputWrapper
                    label="Term"
                    labelFor="term"
                    optionalText="Specify the duration of your employment (e.g. March, 2019 - Present)"
                >
                    <Input
                        type="text"
                        id="term"
                        placeholder="from - to"
                        name="term"
                        value={data.term}
                        onChange={handleChange}
                        onBlur={handleCallback}
                    />
                </InputWrapper>
                <InputWrapper
                    label="Summary"
                    labelFor="summary"
                    optionalText="Summarize your role in this position."
                >
                    <div>
                        <Textarea
                            id="summary"
                            placeholder="Summary of your role."
                            name="summary"
                            value={data.summary}
                            onChange={handleChange}
                            onBlur={handleCallback}
                        />
                        <span className="text-muted text-xs">
                            {`${data.summary.length}/500 characters remaining`}
                        </span>
                    </div>
                </InputWrapper>
                <InputWrapper label="Total Years of Experience" labelFor="experience">
                    <Input
                        type="number"
                        id="experience"
                        placeholder="Total years of experience"
                        name="totalYears"
                        value={data?.totalYears}
                        onChange={handleChange}
                        onBlur={handleCallback}
                    />
                </InputWrapper>
            </div>
        </div>
    );
}