import React from "react";
import { ThemeProvider } from "./ThemeProvider";

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
}