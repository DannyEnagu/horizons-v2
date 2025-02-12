'use client';

import { useState } from "react";
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

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
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
            <p>
                Note: The application uses your profile to fill out common fields like name, email, location, skills etc.
                So please make sure your profile is up to date before applying.
                <Link href="/profile" className="font-semibold text-muted text-brand block mt-0.5">Update Profile</Link>
            </p>
            <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-2">
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
                />
            </div>
            <div className="flex flex-col gap-2">
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
                />
            </div>
            <div className="flex flex-col gap-4">
                <Label htmlFor="resume">
                    <span>
                        Apply with
                    </span>
                </Label>
                <RadioGroup
                    defaultValue="profile"
                >
                    <ToggleGroup
                        type="single"
                        defaultValue="profile"
                        className="flex-col items-start gap-4"
                    >
                        <ToggleGroupItem
                            variant="outline"
                            className="w-full justify-start data-[state=on]:border-[#14A800]  data-[state=on]:bg-brand-light dark:data-[state=on]:border-[#14A800] dark:data-[state=on]:bg-brand-light"
                            value="profile"
                            aria-label="Toggle my profile"
                        >
                            <RadioGroupItem value="profile" />
                            <strong>My Profile</strong>
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="resume"
                            variant="outline"
                            className="w-full justify-start border border-color data-[state=on]:border-[#14A800]  data-[state=on]:bg-brand-light dark:data-[state=on]:border-[#14A800] dark:data-[state=on]:bg-brand-light"
                            aria-label="Toggle my saved resume"
                        >
                            <RadioGroupItem value="resume" />
                            <strong>My Saved Resume</strong>
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Label htmlFor="avatar" className="flex flex-col gap-4 w-full rounded-lg border border-color cursor-pointer p-3 hover:ring-2 hover:ring-[#14A800] hover:ring-offset-2">
                        <span className="flex items-center gap-2 mb-4">
                            <RadioGroupItem value="resume" />
                            <strong>Upload Resume</strong>
                        </span>
                        <span className="text-center">
                            <strong className="underline">Click to upload</strong>
                            <span className="text-muted">
                                {" "}or drag and drop.
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
            <div>
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