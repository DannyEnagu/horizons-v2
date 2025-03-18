'use server';

import prisma from "@/lib/prisma";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { DeleteUserType } from "@/types/user";
import { Employer, User } from "@prisma/client";


export async function getUsersByKindeId (kindeId: string | undefined) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                kindeId
            }
        });

        return user;
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }

}

export async function getExistingUserOrCreateNewUser () {
    try {
        // Get the user from the session
        const {isAuthenticated, getUser} = getKindeServerSession();
        const kindeUser = await getUser();
        const isUserAuthenticated = await isAuthenticated();

        // Check if the user already exists on our database
        const  existingUser = await getUsersByKindeId(kindeUser?.id);

        // If the user already exists on our database,
        // return the user
        if (existingUser)
            return {user: existingUser, isUserAuthenticated};

        // If the user does not exist on our database,
        // create a new user
        const dbUser = await prisma.user.create({
            data: {
                email: `${kindeUser?.email}`,
                fullName: `${kindeUser?.given_name} ${kindeUser?.family_name}`,
                kindeId: `${kindeUser?.id}`,
                avatar: `${kindeUser?.picture}`,
            }
        });

        return {user: dbUser, isUserAuthenticated};
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }
};

export async function updateUser (user: {id: string} & Partial<User>) {
    try {
        const {id, ...rest} = user;
        const userData = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                ...rest
            },
        });

        return {
            message: userData ? "User updated successfully" : "Failed to update user",
            isSuccessful: !!userData,
            result: userData || null
        };
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }
};

export async function deleteUser (userId: DeleteUserType) {
    try {
        const user = await prisma.user.delete({
            where: {
                id: userId
            }
        });

        return user;
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }
};

export async function createEmployer (employerData: Omit<Employer, 'id'>) {
    try {
        const employer = await prisma.employer.create({
            data: {
                ...employerData
            }
        });

        return {
            message: employer ? "Employer created successfully" : "Failed to create employer",
            isSuccessful: !!employer,
            result: employer || null
        };
    } catch (error) {
        console.error(`❌ ${error} ❌`);
        throw error;
    }
};

