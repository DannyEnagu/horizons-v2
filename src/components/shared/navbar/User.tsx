'use client';
import { useUser } from "@clerk/nextjs";

export default function User() {
    const user = useUser();
    console.log(user, 'auth');
    return (<></>
    );
}