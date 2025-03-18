import Header from "@/components/dashboard/Header";
import SideMenu from "@/components/dashboard/nav/SideBar";

export default function Layout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <main className="h-screen w-screen overflow-hidden grid grid-cols-1 md:grid-cols-[250px,_1fr]">
            {/* Left side */}
            <SideMenu />
            {/* Right side */}
            <section className="min-h-screen w-full">
                {/* Page content */}
                <Header />
                <div className="h-[calc(100%-73px)] overflow-auto p-8">
                    {children}
                </div>
            </section>
        </main>
    );
}