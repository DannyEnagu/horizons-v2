'use client';

import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import InputWrapper from "./InputWrapper";
import PrefixInput from "./PrefixInput";
import UserAvatar from "../shared/UserAvatar";

type Social = {
    platform: string;
    url: string;
    username: string;
}

export interface UserEditor {
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    location: string | undefined;
    phone: string | undefined;
    gender: string | undefined;
    avatar: string | undefined;
    socials?: Social[]
}

export interface EditPersonalDetailsProps {
    user: UserEditor | undefined;
    submit: (data: UserEditor) => void;
}

export default function EditPersonalDetails({
    user,
    submit,
}: EditPersonalDetailsProps) {
    const [data, setData] = React.useState<UserEditor>({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        location: user?.location || '',
        phone: user?.phone || '',
        gender: user?.gender || '',
        avatar: user?.avatar || '',
        socials: user?.socials,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    const handleSelectChange = (value: string) => {
        setData({
            ...data,
            gender: value,
        });
        submit({
            ...data,
            gender: value,
        });
    }

    const handleCallback = () => {
        submit(data);
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setData({
                    ...data,
                    avatar: reader.result as string,
                });
                submit({
                    ...data,
                    avatar: reader.result as string,
                });
            }
            reader.readAsDataURL(file);
        }
    }

    const handleSocialsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const username = e.target.value;
        const platform = e.target.name;

        const index = data.socials?.findIndex((social) => social.platform === platform);

        if (index !== undefined && index !== -1 && data.socials?.length) {
            const updatedSocials = [...data.socials];
            updatedSocials[index] = {
                ...updatedSocials[index],
                platform: updatedSocials[index].platform,
                username: username,
                url: updatedSocials[index].url + username
            };
            setData({
                ...data,
                socials: updatedSocials,
            });
            handleCallback();
        }
    }

    return (
        <>
            <InputWrapper
                label="Fullname"
                labelFor="fullname" optionalText="This will be displayed on your profile."
            >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        value={data.firstName}
                        onChange={handleChange}
                        onBlur={handleCallback}
                    />
                    <Input
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
                        name="lastName"
                        value={data.lastName}
                        onChange={handleChange}
                        onBlur={handleCallback}
                    />
                </div>
            </InputWrapper>
            <InputWrapper label="Email" labelFor="email">
                <Input
                    type="email"
                    id="email"
                    placeholder="example@email.com"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    onBlur={handleCallback}
                />
            </InputWrapper>
            <InputWrapper label="Location" labelFor="location">
                <Input
                    type="text"
                    id="location"
                    placeholder="City, Country"
                    name="location"
                    value={data.location}
                    onChange={handleChange}
                    onBlur={handleCallback}
                />
            </InputWrapper>
            <InputWrapper label="Phone" labelFor="phone">
                <PrefixInput
                    prefix="+234"
                    type="tel"
                    id="phone"
                    placeholder="816 123 4567"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    onBlur={handleCallback}
                />
            </InputWrapper>
            <InputWrapper label="Gender" labelFor="gender">
                <Select onValueChange={handleSelectChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Your Gender" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                </Select>
            </InputWrapper>
            <Separator />
            <InputWrapper label="Profile Picture" labelFor="profilePix">
                <div className="flex items-center gap-8">
                    <UserAvatar
                        name={`${data.firstName} ${data.lastName}`}
                        avatar={data?.avatar || ''}
                        className="h-20 w-20 rounded-lg"
                    />
                    <Label htmlFor="profilePicker" className="flex-1 flex items-center justify-center gap-1 h-20 w-20 rounded-lg border border-color cursor-pointer px-3 hover:ring-2 hover:ring-slate-950 hover:ring-offset-2">
                        <strong className="underline">Click to upload</strong> <span className="text-muted">
                        or drag and drop a new profile picture.
                        </span>
                    </Label>
                    <Input
                        type="file"
                        id="profilePicker"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e)}
                        onBlur={handleCallback}
                    />
                </div>
            </InputWrapper>
            <Separator />
            <InputWrapper label="Social Profiles" labelFor="socials">
                <div className="space-y-4">
                    {data.socials?.map((social) => (
                        <PrefixInput
                            key={social.platform}
                            prefix={social.url}
                            placeholder="username"
                            id={social.platform}
                            name={social.platform}
                            onBlur={handleSocialsChange}
                        />
                    ))}
                </div>
            </InputWrapper>
        </>
    );
}