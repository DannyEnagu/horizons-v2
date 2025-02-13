'use client';

import Link from "next/link";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import ThemeSwitch from "./ThemeSwitch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
import UserAvatar from "../UserAvatar";

import Logo from "../Logo";
import Menu from "./Menu";
import useUser from "@/hooks/use-user";

export default function Navbar() {
  const { user } = useUser();
  return (
    <nav className="fixed top-0 w-screen z-10 py-4 px-8 lg:px-16 border-b border-color flex-between background-light850_dark100">
        <div className="flex items-center gap-4 md:gap-10 lg:gap-40">
          <MobileMenu isUserAuthenticated={user?.isAuthenticated as boolean} />
          <Link className="hidden md:block" href="/">
            <Logo />
          </Link>
          {/* Top Menu */}
          <div className="hidden md:block">
            <Menu type="desktop" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeSwitch />
          {/* If not loggedIn */}
          {!user?.isAuthenticated && (
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
            {!user?.isAuthenticated
            ? (<LoginLink postLoginRedirectURL="/post-job">
                Post a Job
              </LoginLink>)
            : (<Link href="/post-job">Post a Job</Link>)}
          </Button>
          {/* If loggedIn */}
          {user?.isAuthenticated && (<>
              <Link href="/profile">
                <UserAvatar name={user?.fullName} avatar={user?.avatar} />
              </Link>
            </>)}
        </div>
    </nav>
  );
}