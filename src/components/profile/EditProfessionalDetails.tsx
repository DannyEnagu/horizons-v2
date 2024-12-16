import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import InputWrapper from "./InputWrapper";

export interface Profile {
    headline: string | undefined;
    bio: string | undefined;
    skills: string[] | undefined;
    jobSeekerId: string | undefined;
}

interface ProfessionalProfileProps {
    profile: Profile | undefined;
    submit: (profile: Profile) => void;
}


export default function EditProfessionalDetails({
    profile, submit,
}: ProfessionalProfileProps) {
    const [data, setData] = React.useState<Profile>({
        headline: profile?.headline || '',
        bio: profile?.bio || '',
        skills: profile?.skills || [],
        jobSeekerId: profile?.jobSeekerId || '',
    });
    const [newSkill, setNewSkill] = React.useState<string>('');
    const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.includes(',')) {
            setData({
                ...data,
                skills: e.target.value.split(','),
            });
            setNewSkill('');
        } else {
            setNewSkill(value);
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }
    const handleCallback = () => {
        submit(data);
    }
    return (<>
        <InputWrapper
            label="Headline"
            labelFor="headline"
            optionalText="Add a professional headline (e.g. Senior Software Engineer)"
        >
            <Input
                type="text"
                id="headline"
                name="headline"
                placeholder="Professional Headline"
                value={data.headline}
                onChange={handleChange}
                onBlur={handleCallback}
            />
        </InputWrapper>
        <InputWrapper label="Bio" labelFor="bio">
            <div>
                <Textarea
                    id="bio"
                    placeholder="Tell us about yourself."
                    name="bio"
                    value={data.bio}
                    onChange={handleChange}
                    onBlur={handleCallback}
                />
                <span className="text-muted text-xs">
                    400 characters remaining
                </span>
            </div>
        </InputWrapper>
        <InputWrapper label="Skills" labelFor="skills" optionalText="Add up to 10 skills">
            <div>
                <Textarea
                    id="skills"
                    placeholder="Type comma separated skills"
                    name="skills"
                    value={newSkill}
                    onChange={handleSkillsChange}
                    onBlur={handleCallback}
                />
                <span className="flex flex-wrap items-center gap-1 mt-3">
                    {data?.skills?.map((skill, index) => (
                        <span
                            key={index}
                            className="flex items-center justify-center text-xs rounded-full border border-[#14A800] capitalize px-4 py-2 text-light400_light500"
                        >
                            {skill}
                        </span>
                    ))}
                </span>
            </div>
        </InputWrapper>
    </>);
}