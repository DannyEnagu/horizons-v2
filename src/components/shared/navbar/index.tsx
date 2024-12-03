import Link from "next/link";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import DesktopMenu from "./DesktopMenu";
import ThemeSwitch from "./ThemeSwitch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
import UserAvatar from "../UserAvatar";
import { getExistingUserOrCreateNewUser } from "@/server/actions/user.action";

export default async function Navbar() {
  const {isUserAuthenticated, user} = await getExistingUserOrCreateNewUser();
  if (isUserAuthenticated) {
    console.log("User is authenticated", user);
    
  }
  return (
    <nav className="fixed top-0 w-screen z-10 py-4 px-8 lg:px-16 border-b border-color flex-between background-light850_dark100">
        <div className="flex items-center gap-4 md:gap-10 lg:gap-40">
          <MobileMenu isUserAuthenticated={isUserAuthenticated} />
          <Link href="/">Logo</Link>
          <DesktopMenu />
        </div>
        <div className="flex items-center space-x-4">
          <ThemeSwitch />
          {/* If not loggedIn */}
          {!isUserAuthenticated && (
            <div className="hidden md:flex items-center gap-4 h-9">
              <Button variant="link" size="sm">
                <LoginLink postLoginRedirectURL="/">
                  Login
                </LoginLink>
              </Button>
              <Separator orientation="vertical" />
              <Button variant="outline" size="sm">
                <RegisterLink postLoginRedirectURL="/">
                  Sign Up
                </RegisterLink>
              </Button>
            </div>
          )}
          <Button variant="secondary" size="sm" className="btn btn-secondary">
            <Link href="/post-job">Post a Job</Link>
          </Button>
          {/* If loggedIn */}
          {isUserAuthenticated && (<>
              <Link href="/profile">
                <UserAvatar name={user?.fullName} avatar={user?.avatar} />
              </Link>
            </>)}
        </div>
    </nav>
  );
}