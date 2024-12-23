'use client';
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface BackButtonProps {
    title: string;
}

export default function BackButton({ title }: BackButtonProps) {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    }
    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
        >
            {title}
        </Button>
    );
}