import Navbar from "@/components/shared/navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="relative pb-16">
            <Navbar />
            <section>
                <div className="mt-16 pt-12">
                    {children}
                </div>
            </section>
        </main>
    );
}