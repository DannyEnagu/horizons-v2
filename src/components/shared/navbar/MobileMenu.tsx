import Image from "next/image";
import {RegisterLink, LogoutLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "../Logo";
import Menu from "./Menu";
import Link from "next/link";

interface MobileMenuProps {
  isUserAuthenticated: boolean;
}

export default function MobileMenu({ isUserAuthenticated }: MobileMenuProps) {
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
            <Image
              src="/icons/humbugger.svg"
              alt="Toggle Mobile Menu"
              width={24}
              height={24}
              className="dark:invert-colors"
            />
        </Button>
      </SheetTrigger>
      <SheetHeader className="sr-only">
        <SheetTitle>Mobile Menu</SheetTitle>
        <SheetDescription>
          Mobile menu dialog
        </SheetDescription>
      </SheetHeader>
      <SheetContent
        side="left"
        className="bg-light-900 dark:bg-dark-200 text-dark-300 dark:text-light-900 border-none"
      >
        <SheetClose asChild>
          <Link href="/">
            <Logo />
          </Link>
        </SheetClose>
        <div className="h-[80%] pt-20">
          <Menu type="mobile" />
        </div>
        <SheetFooter className="block">
          {/* If loggedIn */}
          {isUserAuthenticated && (
            <SheetClose className="w-full" asChild>
              <Button variant="destructive">
                <LogoutLink postLogoutRedirectURL="/">LogOut</LogoutLink>
              </Button>
            </SheetClose>
          )}
          {/* If not loggedIn */}
          {!isUserAuthenticated && (
            <div className="flex flex-col gap-4">
                <SheetClose className="w-full" asChild>
                  <Button variant="outline">
                    <LoginLink postLoginRedirectURL="/">Login</LoginLink>
                  </Button>
                </SheetClose>
                <SheetClose className="w-full" asChild>
                  <Button variant="secondary">
                    <RegisterLink postLoginRedirectURL="/">Sign Up</RegisterLink>
                  </Button>
                </SheetClose>
            </div>)}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
