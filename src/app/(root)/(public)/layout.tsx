import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex flex-col">
            <Header />
            <main className="flex-1 mt-16">
                {children}
            </main>
            <Footer />
        </div>
    );
}