import { Label } from "../ui/label";


export default function InputWrapper({
    children,
    label,
    labelFor,
    optionalText,
}: {
    label: string;
    labelFor: string;
    optionalText?: string;
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <Label htmlFor={labelFor}>
                {label}
                {optionalText && (
                    <span className="block text-muted text-xs mt-2"> {optionalText}
                    </span>
                )}
            </Label>
            <div className="sm:w-1/2">
                {children}
            </div>
        </div>
    );
}