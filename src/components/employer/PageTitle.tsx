
interface HeadingProps {
    children: React.ReactNode;
    className?: string;
}

export default function PageTitle({children, className}: HeadingProps) {
    return (
        <div>
            <h1 className={`mt-4 mb-16 font-bold text-2xl ${className || ''}`}>
                {children}
            </h1>
        </div>
    );
}