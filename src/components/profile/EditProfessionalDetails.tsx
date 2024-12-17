import React, { Fragment } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import InputWrapper from "./InputWrapper";
import { Button } from "../ui/button";
import { X } from "lucide-react";
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
        if (value.includes(',') || value.length === 0) {
            // Remove empty strings and duplicates
            const skills = value.split(',')
                .map(skill => skill.trim())
                .filter(skill => skill.length > 0)
                .filter((skill, index, self) => self.indexOf(skill) === index);

            setData({
                ...data,
                skills: [...skills],
            });
        }
        setNewSkill(value);
    }

    const deleteSkill = (skill: string) => {
        const skills = data.skills?.filter(s => s !== skill);
        const newSkills = skills ? [...skills] : [];
        setData({
            ...data,
            skills: skills,
        });
        setNewSkill(newSkills.join(','));
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
                    {data?.skills?.map((skill, index) => (<Fragment key={index}>
                        <span
                            className="flex items-center justify-between text-xs rounded-full border border-[#14A800] capitalize px-4 py-2 text-light400_light500 gap-4"
                        >
                            <span>{skill}</span>
                            <Button
                                variant="ghost"
                                className="bg-red-500/70 items-center justify-center rounded-full h-5 w-5 p-0 text-xs text-white ml-auto"
                                size="sm"
                                onClick={() => deleteSkill(skill)}
                            >
                                <X />
                            </Button>
                        </span>
                    </Fragment>
                    ))}
                </span>
            </div>
        </InputWrapper>
    </>);
}