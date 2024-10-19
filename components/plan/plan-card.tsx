"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { SignInButton, useUser } from "@clerk/nextjs";

export default function PlanCard({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  const { isSignedIn, isLoaded } = useUser();
  const handleCheckout = async () => {};

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 border">
      <Image
        width={100}
        height={100}
        className="m-5"
        src={`/images/${image}.png`}
        alt="monthly membership image"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name} Membership</div>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          Enjoy
          {name === "Free"
            ? "Limited AI generated content forever for just $0.00/month"
            : "Unlimited AI generated content forever for just $9.99/month"}
        </p>
        <ul className="m-5">
          <li>
            ✨ {name === "Free" ? "Limited" : "Unlimited"} word generation
          </li>
          <li>🧠 Advanced AI features</li>
          <li>⚡ Faster processing times</li>
          <li>🛠 {name === "Free" ? "" : "Priority"} Customer support</li>
        </ul>
      </div>
      {!isLoaded ? (
        ""
      ) : !isSignedIn ? (
        <div className="px-5 pb-10">
          <Button>
            <SignInButton />
          </Button>
        </div>
      ) : (
        <div className="px-5 pb-10">
          <Button onClick={handleCheckout}>Get Started</Button>
        </div>
      )}
    </div>
  );
}
