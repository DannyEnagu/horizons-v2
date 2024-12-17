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
import { createWorkExperience } from "@/server/actions/profile.action";
import { revalidatePath } from "next/cache";

export interface WorkExperience {
    company: string;
    designation: string;
    jobType: string;
    term: string;
    summary: string;
    id: string;
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
    const { toast } = useToast();
    const [totalYears, setTotalYears] = React.useState(totalYearsExperience || undefined);
    const [showForm, setShowForm] = React.useState(experiences.length === 0);

    const [data, setData] = React.useState<WorkExperience>({
        company: '',
        designation: '',
        term: '',
        summary: '',
        jobType: '',
        id: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.name === 'totalYears') {
            setTotalYears(e.target.value ? parseInt(e.target.value) : undefined);
            return;
        }
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
            totalYearsExperience: totalYears,
        });
    }

    const handleCallback = () => {
        if (data.id === '' && showForm) {
            return;
        }
        console.log(data, showForm);
        const exps = [];
        exps.push(data);
        submit({
            experiences: exps,
            totalYearsExperience: totalYears,
        });
    }

    const addExperience = async () => {
        setIsSaving(true);
        
        const res = await createWorkExperience({
            company: data.company,
            designation: data.designation,
            term: data.term,
            summary: data.summary,
            jobType: data.jobType,
            jobTitle: data.designation,
        }, userId);

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
            jobType: '',
            id: ''
        });
        setTotalYears(0);
    }

    const handleMenuSelect = (item: string, id: string) => {
        setShowForm(true);
        if (item !== 'Edit') {
            clearData();
            return;
        }
        const exp = experiences.find((work) => work.id === id);
        if (exp) {
            setData(exp);
            return;
        }
    }

    return (
        <div>
            <div className="space-y-2 mb-8">
                {experiences.map((experience) => (
                    <div key={experience.id} className="flex w-full flex-col items-start justify-between rounded-md border py-1 px-3 sm:flex-row sm:items-center">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-8 text-sm font-medium leading-none">
                            <span className="underline">
                                {experience?.designation}
                            </span>
                            <span>
                                @ <strong>
                                    {experience?.company}
                                </strong>
                            </span>
                            <Badge className="rounded-lg text-center self-start">
                                {experience?.term}
                            </Badge>
                        </div>
                        <ComboboxDropdownMenu
                            itemId={experience?.id || ''}
                            label="Select Experience"
                            menuItems={[
                                'Edit',
                                'New',
                            ]}
                            onDelete={(id) => {
                                console.log(id, 'deleted');
                            }}
                            onSelectMenuItem={(item) => handleMenuSelect(item, experience.id)}
                        />
                    </div>
                ))}
            </div>
            <div className="space-y-4">
                {
                    !showForm && (
                        <InputWrapper label="Total Years of Experience" labelFor="experience">
                            <Input
                                type="number"
                                id="experience"
                                placeholder="Total years of experience"
                                name="totalYears"
                                value={totalYears}
                                onChange={handleChange}
                                onBlur={handleCallback}
                            />
                        </InputWrapper>
                    )
                }
                {showForm &&
                    <>
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
                    </>
                }
            </div>
            {(data.id === '' && showForm) && (
                <div className="flex items-center justify-end gap-4 mt-8">
                    <Button
                        onClick={clearData}
                    >
                        Clear
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={addExperience}
                        disabled={isSaving
                            || !data.company
                            || !data.designation
                            || !data.term
                            || !data.summary
                        }
                    >
                        {isSaving ? (
                            <Loader size={20} />
                        ) : (
                            "Add Experience"
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
}