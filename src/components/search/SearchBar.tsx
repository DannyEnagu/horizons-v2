import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface SearchInputProps {
    placeholder: string;

}

export default function SearchBar({ placeholder } : SearchInputProps) {
    return (
        <div className="flex items-center gap-2 background-light800_dark_gradient px-4 py-1 rounded-lg">
            <Search className="text-light400_light500" />
            <Input placeholder={placeholder ? placeholder : 'Start Typing'} className="flex-1 text-dark400_light700 bg-transparent dark:bg-transparent border-0 outline-none shadow-none focus-visible:ring-offset-0 dark:focus-visible:ring-offset-0 focus-visible:ring-transparent dark:focus-visible:ring-transparent placeholder" />
        </div>
    )
}