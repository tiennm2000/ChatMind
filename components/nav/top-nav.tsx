"use client";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import logo from "../../public/images/horizontal-logo.png";

export default function TopNav() {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="flex justify-between items-center p-2 shadow">
      <Link href="/">
        <Image
          src={logo}
          alt="Logo"
          width={200}
          height={100}
          objectFit="cover"
        ></Image>
      </Link>
      <div className="flex items-center gap-2">
        {isSignedIn && (
          <Link href="/dashboard">{`${user.fullName}'s Dashboard`}</Link>
        )}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
