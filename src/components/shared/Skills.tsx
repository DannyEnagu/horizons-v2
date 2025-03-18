
interface SkillsProps {
    skills: string[] | undefined;
}

export default function Skills({ skills }: SkillsProps) {
    return (
        <div className="flex flex-wrap items-center gap-1 gap-y-2 mt-3">
            {skills?.map((skill, index) => (
                <span
                    key={index}
                    className="flex items-center justify-center text-xs rounded-full border border-[#14A800] capitalize px-4 py-2 text-light400_light500"
                >
                    {skill}
                </span>
            ))}
        </div>
    );
}