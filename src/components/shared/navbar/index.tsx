import Link from "next/link";
import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs';
import DesktopMenu from "./DesktopMenu";
import ThemeSwitch from "./ThemeSwitch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
// import User from "./User";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-screen z-10 py-4 px-8 lg:px-16 border-b border-color flex-between background-light850_dark100">
        <div className="flex items-center gap-4 md:gap-10 lg:gap-40">
          <MobileMenu />
          <Link href="/">Logo</Link>
          <DesktopMenu />
        </div>
        <div className="flex items-center space-x-4">
          <ThemeSwitch />
          {/* If not loggedIn */}
          <SignedOut>
            <div className="hidden md:flex items-center gap-4 h-9">
              <Button variant="link" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Separator orientation="vertical" />
              <Button variant="outline" size="sm">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          </SignedOut>
          <Button variant="secondary" size="sm" className="btn btn-secondary">
            <Link href="/post-job">Post a Job</Link>
          </Button>
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: { avatarBox: 'h-10 w-10' },
                variables: {
                  colorPrimary: '#ff7000'
                }
              }}
            />
          </SignedIn>
        </div>
      {/* <User /> */}
    </nav>
  );
}