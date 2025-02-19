"use client";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import logo from "../../public/images/horizontal-logo.png";
import { ModeToggle } from "./theme-toggle";
import { Button } from "../ui/button";
import { useUsage } from "../context/usage";

export default function TopNav() {
  const { isSignedIn, user } = useUser();
  const { subscribed } = useUsage();

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
      <Link href="/gen-ai">Gen AI</Link>
      {!subscribed && (
        <Link href="/membership">🔥 Join free or $9.99/month</Link>
      )}
      <div className="flex items-center gap-2">
        {isSignedIn && (
          <Link href="/dashboard">
            <Button className="bg-blue-700 dark:bg-blue-100">{`${user.fullName}'s Dashboard`}</Button>
          </Link>
        )}

        <SignedOut>
          <Button>
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        <ModeToggle />
      </div>
    </nav>
  );
}
