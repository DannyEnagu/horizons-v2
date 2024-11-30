import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
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


export default function MobileMenu() {
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
        className="background-light900_dark200 text-dark300_light900 border-none"
      >
        <SheetClose asChild>
          <Link href="/">
              Logo
          </Link>
        </SheetClose>
        <ul className="flex flex-col gap-4 h-[80%] pt-20">
            <li>
              <SheetClose asChild>
                <Link href="/" passHref>
                  Jobs
                </Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link href="/employers" passHref>
                  For Employers
                </Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link href="/resources" passHref>
                    Resources
                </Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link href="/about" passHref>
                  About
                </Link>
              </SheetClose>
            </li>
        </ul>
        <SheetFooter className="block">
          <SignedIn>
              <SignOutButton>
                <SheetClose className="w-full" asChild>
                  <Button variant="destructive">Sign Out</Button>
                </SheetClose>
              </SignOutButton>
          </SignedIn>
          <SignedOut>
            <div className="flex flex-col gap-4">
                <SheetClose className="w-full" asChild>
                  <Button variant="outline">
                      <Link href="/login">Login</Link>
                  </Button>
                </SheetClose>
                <SheetClose className="w-full" asChild>
                  <Button variant="secondary">
                      <Link href="/sign-up">Sign Up</Link>
                  </Button>
                </SheetClose>
            </div>
          </SignedOut>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
