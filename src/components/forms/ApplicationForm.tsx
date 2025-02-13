'use client';

import { MouseEvent, useState } from "react";
import Link from "next/link";
import { Job, User } from "@prisma/client";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "../ui/separator";


interface ApplicationFormProps {
    job: Job;
    user: User | null;
}

export default function ApplicationForm({ job, user }: ApplicationFormProps) {
    const [formData, setFormData] = useState({
        coverLetter: '',
        resume: '',
        salary: '',
        experience: '',
    });

    const [fileName, setFileName] = useState('');

    const [selectedOption, setSelectedOption] = useState('profile');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add submit logic here
    };

    const handleApplyWithOption = (option: string) => {
        if (option) setSelectedOption(option);
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleApplyWithOption('upload');
        const file = e.target.files?.[0];
        setFileName(file?.name as string);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData({
                    ...formData,
                    [e.target.id]: reader.result as string,
                });
            }
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="px-4">
                <p className="text-base bg-yellow-500/15 p-4 rounded-lg italic">
                    Note: The application uses your profile to fill out common fields like name, email, location, skills etc.
                    So please make sure your profile is up to date before applying.
                    <Link href="/profile" className="font-semibold text-brand inline-block ml-2 underline">update your profile</Link>
                </p>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col gap-2 px-4">
                <Label htmlFor="salary" className="flex items-center gap-2">
                    <span>Salary Expectation (Monthly)</span>
                    <span className="text-red-500 text-sm">*</span>
                </Label>
                <Input
                    type="number"
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="!bg-transparent"
                />
            </div>
            <div className="flex flex-col gap-2 px-4">
                <Label htmlFor="experience">
                    <span>Years of Experience</span>
                    <span className="text-red-500 text-sm">*</span>
                </Label>
                <Input
                    type="number"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="!bg-transparent"
                />
            </div>
            <div className="flex flex-col gap-2 px-4">
                <Label htmlFor="coverLetter" className="flex items-center gap-2">
                    <span>Cover Letter</span>
                    <span className="text-red-500 text-sm">*</span>
                </Label>
                <Textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows={5}
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Write a cover letter"
                />
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col gap-4 px-4">
                <Label htmlFor="resume">
                    <span>
                        Apply with
                    </span>
                </Label>
                <RadioGroup
                    value={selectedOption}
                >
                    <ToggleGroup
                        type="single"
                        value={selectedOption}
                        orientation="vertical"
                        className="flex-col items-start gap-4"
                        onValueChange={(value) => handleApplyWithOption(value)}
                    >
                        <ToggleGroupItem
                            variant="outline"
                            className="w-full justify-start hover:border-brand data-[state=on]:border-brand  data-[state=on]:bg-brand-light dark:hover:border-brand dark:data-[state=on]:border-brand dark:data-[state=on]:bg-brand-light hover:bg-brand-light dark:hover:bg-brand-light"
                            value="profile"
                            aria-label="Toggle my profile"
                            
                        >
                            <RadioGroupItem value="profile" />
                            <strong>My Profile</strong>
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="resume"
                            variant="outline"
                            className="w-full justify-start hover:border-brand data-[state=on]:border-brand  data-[state=on]:bg-brand-light dark:hover:border-brand dark:data-[state=on]:border-brand dark:data-[state=on]:bg-brand-light hover:bg-brand-light dark:hover:bg-brand-light"
                            aria-label="Toggle my saved resume"
                        >
                            <RadioGroupItem value="resume" />
                            <strong>My Saved Resume</strong>
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Label htmlFor="avatar" className="flex flex-col gap-4 w-full rounded-lg cursor-pointer p-3 border border-color ring-gray-300 hover:ring-2 hover:ring-[#14A800] hover:ring-offset-0">
                        <span className="flex items-center gap-2 mb-4">
                            <RadioGroupItem value="upload" />
                            <strong>Upload Resume</strong>
                        </span>
                        <span className="text-center">
                            <strong className="underline">
                                {fileName ? fileName : "Click to upload"}{" "}
                            </strong>
                            <span className="text-muted">
                                {!fileName ? " or drag and drop." : " "}
                            </span>
                        </span>
                        <span className="text-muted">
                            File types supported: .pdf, .docx, .doc.
                            File size should be less than 10MB.
                        </span>
                    </Label>
                    <Input
                        type="file"
                        id="avatar"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e)}
                    />
                </RadioGroup>
            </div>
            <Separator className="my-4" />
            <div className="px-4">
                <Button
                    variant="secondary"
                    type="submit"
                    className="w-full"
                >
                    Apply Now
                </Button>
            </div>
        </form>
    );
}