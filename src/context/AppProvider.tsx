import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "./AuthProvider";
// import { Toaster } from "@/components/ui/toaster"

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <ThemeProvider>
                {children}
                {/* <Toaster /> */}
            </ThemeProvider>
        </AuthProvider>
    );
}