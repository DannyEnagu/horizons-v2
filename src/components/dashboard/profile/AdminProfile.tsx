'use client';
import React, { useEffect, useState } from "react";
import InputWrapper from "../../profile/InputWrapper";
import UserAvatar from "../../shared/UserAvatar";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import useUser from "@/hooks/use-user";
import { Skeleton } from "@/components/ui/skeleton";
import { updateUser } from "@/server/actions/user.action";
import { useToast } from "@/hooks/use-toast";
import { updateEmployer } from "@/server/actions/employer.action";
import Spinner from "@/components/shared/Spinner";

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
    const [submitting, setSubmitting] = useState<boolean>(false);
    const { toast } = useToast();
    const { user, loading } = useUser();
    const [data, setData] = useState<ProfileEditor>({
        firstName: user?.fullName.split(' ')[0] || '',
        lastName: user?.fullName.split(' ')[1] || '',
        email: user?.email || '',
        avatar: user?.avatar || '',
        companyName: '',
        companyWebsite: '',
        companyLogo: '',
        companyDescription: '',
    });

    useEffect(() => {
        if (user?.id) {
            setData((prev) => ({
                ...prev,
                firstName: user?.fullName.split(' ')[0] || '',
                lastName: user?.fullName.split(' ')[1] || '',
                email: user?.email || '',
                avatar: user?.avatar || '',
                companyName: user?.employer?.companyName || '',
                companyWebsite: user?.employer?.website || '',
                companyLogo: user?.employer?.companyLogo || '',
                companyDescription: user?.employer?.companyDescription || '',
            }));
        }

    }, [user]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({
            ...data,
            [e.target.id]: e.target.value,
        });
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setData({
                    ...data,
                    [e.target.id]: reader.result as string,
                });
            }
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        const res = await updateUser({
            id: user?.id as string,
            fullName: `${data.firstName} ${data.lastName}`,
            email: data.email,
            avatar: data.avatar,
        })

        const employerRes = await updateEmployer({
            id: user?.employer?.id as string,
            companyName: data.companyName,
            website: data.companyWebsite,
            companyLogo: data.companyLogo,
            companyDescription: data.companyDescription,
        });

        setSubmitting(false);
        if (res.isSuccessful && employerRes.isSuccessful) {
            toast({
                security: 'success',
                description: res.message
            })
            return;
        }

        toast({
            security: 'error',
            description: res.message
        })        
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="background-light800_dark_gradient rounded-2xl space-y-6 p-8 md:p-12">
                <div className="flex justify-center md:w-3/4 mx-auto mb-12">
                    {!loading
                        ? <UserAvatar
                                name={`${data.firstName} ${data.lastName}`}
                                avatar={data.avatar || ''}
                                className="w-24 h-24"
                            />
                        : <Skeleton className="w-24 h-24 rounded-full" />
                    }
                    
                </div>
                <InputWrapper
                    labelFor="firstName"
                    label="First Name"
                    asCol
                    required
                >
                    <Input
                        id="firstName"
                        value={data.firstName}
                        placeholder="First Name"
                        onChange={handleChange}
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
                        value={data.lastName}
                        onChange={handleChange}
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
                        value={data.email}
                        onChange={handleChange}
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
                        {!loading
                            ? <UserAvatar
                                    name={`${data.firstName} ${data.lastName}`}
                                    avatar={data.avatar || ''}
                                    className="w-20 h-20 rounded-lg"
                                />
                            : <Skeleton className="w-20 h-20 rounded-lg" />
                        }
                        <Label htmlFor="avatar" className="flex-1 flex items-center justify-center gap-1 h-20 w-20 rounded-lg border border-color cursor-pointer px-3 hover:ring-2 hover:ring-slate-950 hover:ring-offset-2">
                            <strong className="underline">Click to upload</strong> <span className="text-muted">
                            or drag and drop.
                            </span>
                        </Label>
                        <Input
                            type="file"
                            id="avatar"
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
                        value={data.companyName}
                        onChange={handleChange}
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
                        value={data.companyWebsite}
                        onChange={handleChange}
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
                        {!loading
                            ? <UserAvatar
                                    name={`${data.companyName}`}
                                    avatar={data.companyLogo || ''}
                                    className="w-20 h-20 rounded-lg"
                                />
                            : <Skeleton className="w-20 h-20 rounded-lg" />
                        }
                        <Label htmlFor="companyLogo" className="flex-1 flex items-center justify-center gap-1 h-20 w-20 rounded-lg border border-color cursor-pointer px-3 hover:ring-2 hover:ring-slate-950 hover:ring-offset-2">
                            <strong className="underline">Click to upload</strong> <span className="text-muted">
                            or drag and drop.
                            </span>
                        </Label>
                        <Input
                            type="file"
                            id="companyLogo"
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
                            id="companyDescription"
                            placeholder="Write something interesting about the company's..."
                            value={data.companyDescription}
                            onChange={handleChange}
                        />
                        <p className="text-muted text-xs mt-2 text-right">
                            {`${data.companyDescription.length}/500 characters remaining`}
                        </p>
                    </div>
                </InputWrapper>

            </div>
            <div className="flex items-center justify-start !mt-8 md:w-3/4 mx-auto gap-4 px-2 md:px-12">
                <Button
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-4"
                    disabled={submitting}
                    type="submit"
                >
                    <span> Save Changes </span>
                    {submitting && <Spinner size="sm" />}
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