import SideMenu from "@/components/dashboard/SideBar";

export default function Layout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <main className="h-screen w-screen overflow-hidden gird grid-cols-[250px,_1fr]">
            {/* Left side */}
            <aside className="h-full w-[250px] border-r border-color">
                <SideMenu />
            </aside>
            {/* Right side */}
            <section>
                {/* Page content */}
                {children}
            </section>
        </main>
    );
}