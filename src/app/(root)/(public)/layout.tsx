import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="relative pb-16">
            <Header />
            <section>
                <div className="mt-16 pt-12">
                    {children}
                </div>
            </section>
            <Footer />
        </main>
    );
}