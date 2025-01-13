import Link from "next/link";


interface MenuGroupProps {
    title: string,
    items: {
        label: string;
        url: string
    }[]
}

export default function MenuGroup (
    {title, items}: MenuGroupProps
) {
    const menuItems = items.map((item) => (
        <li key={item.label}>
            <Link href={item.url}>
                {item.label}
            </Link>
        </li>
    ))
    return (
        <div>
            <h3 className="text-muted text-sm">
                {title}
            </h3>
            <ul>
                {menuItems}
            </ul>
        </div>
    );
}