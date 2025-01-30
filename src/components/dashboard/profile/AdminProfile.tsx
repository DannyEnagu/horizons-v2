'use client';
import React, { useState } from "react";
import InputWrapper from "../../profile/InputWrapper";
import UserAvatar from "../../shared/UserAvatar";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";

interface ProfileEditor {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    companyName: string;
    companyWebsite: string;
    companyLogo: string;
    companyDescription: string;
}

export default function AdminProfile() {
    const [data, setData] = useState<ProfileEditor>({
        firstName: '',
        lastName: '',
        email: '',
        avatar: '',
        companyName: '',
        companyWebsite: '',
        companyLogo: '',
        companyDescription: '',
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setData({
                    ...data,
                    avatar: reader.result as string,
                });
            }
            reader.readAsDataURL(file);
        }
    }
    return (
        <form className="space-y-8">
            <div className="background-light800_dark_gradient rounded-2xl space-y-6 p-8 md:p-12">
                <div className="md:w-3/4 mx-auto mb-12">
                    <UserAvatar
                        name={"John Doe"}
                        avatar={""}
                        className="w-24 h-24"
                    />
                </div>
                <InputWrapper
                    labelFor="firstName"
                    label="First Name"
                    asCol
                    required
                >
                    <Input
                        id="firstName"
                        placeholder="First Name"
                        required
                    />
                </InputWrapper>
                <InputWrapper
                    labelFor="lastName"
                    label="Last Name"
                    asCol
                    required
                >
                    <Input
                        id="lastName"
                        placeholder="Last Name"
                        required
                    />
                </InputWrapper>
                <InputWrapper
                    labelFor="email"
                    label="Email"
                    asCol
                    required
                >
                    <Input
                        type="email"
                        id="email"
                        placeholder="Enter Email Address"
                        required
                    />
                </InputWrapper>
                <InputWrapper
                    label="Profile Picture"
                    labelFor="profilePix"
                    asCol
                    required
                    >
                    <div className="flex items-center gap-8">
                        <UserAvatar
                            name={`${data.firstName}`}
                            avatar={data.avatar || ''}
                            className="h-20 w-20 rounded-lg"
                        />
                        <Label htmlFor="profilePicker" className="flex-1 flex items-center justify-center gap-1 h-20 w-20 rounded-lg border border-color cursor-pointer px-3 hover:ring-2 hover:ring-slate-950 hover:ring-offset-2">
                            <strong className="underline">Click to upload</strong> <span className="text-muted">
                            or drag and drop.
                            </span>
                        </Label>
                        <Input
                            type="file"
                            id="profilePicker"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e)}
                        />
                    </div>
                </InputWrapper>
            </div>
            <div className="background-light800_dark_gradient rounded-2xl space-y-6 p-8 md:p-12">
                <h3 className="text-center uppercase font-bold">
                    Company Details
                </h3>
                <InputWrapper
                    labelFor="companyName"
                    label="Company Name"
                    asCol
                    required
                >
                    <Input
                        id="companyName"
                        placeholder="Company Name"
                        required
                    />
                </InputWrapper>
                <InputWrapper
                    labelFor="companyWebsite"
                    label="Company Website"
                    asCol
                    required
                >
                    <Input
                        id="companyWebsite"
                        placeholder="Company Website"
                        required
                    />
                </InputWrapper>
                <InputWrapper
                    label="Company Logo"
                    labelFor="logoPicker"
                    asCol
                    required
                >
                    <div className="flex items-center gap-8">
                        <UserAvatar
                            name={`${data.companyName}`}
                            avatar={data.companyLogo || ''}
                            className="h-20 w-20 rounded-lg"
                        />
                        <Label htmlFor="logoPicker" className="flex-1 flex items-center justify-center gap-1 h-20 w-20 rounded-lg border border-color cursor-pointer px-3 hover:ring-2 hover:ring-slate-950 hover:ring-offset-2">
                            <strong className="underline">Click to upload</strong> <span className="text-muted">
                            or drag and drop.
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
                <InputWrapper
                    label="About the Company"
                    labelFor="summary"
                    asCol
                    optionalText="Write a brief description about the company"
                    required
                >
                    <div>
                        <Textarea
                            id="summary"
                            placeholder="Write something interesting about the company's..."
                            value={data.companyDescription}
                        />
                        <span className="text-muted text-xs">
                            {`${data.companyDescription.length}/500 characters remaining`}
                        </span>
                    </div>
                </InputWrapper>

            </div>
            <div className="flex items-center justify-start !mt-8 md:w-3/4 mx-auto gap-4 px-2 md:px-12">
                <Button
                    variant="secondary"
                    size="sm"
                    type="submit"
                >
                    Save Changes
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    type="reset"
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}