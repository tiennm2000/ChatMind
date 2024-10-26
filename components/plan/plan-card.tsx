"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import toast, { Toaster } from "react-hot-toast";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createCheckoutSession } from "@/actions/stripe";
import { useState } from "react";
import { Divide, Loader2Icon } from "lucide-react";

export default function PlanCard({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  //state
  const [loading, setLoading] = useState(false);
  //hook
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const handleCheckout = async () => {
    if (name === "Free") {
      router.push("/dashboard");
      return;
    }
    setLoading(true);
    try {
      const response = await createCheckoutSession();

      const { url, error } = response;

      if (error) {
        toast.error(error);
        return;
      }
      if (url) {
        window.location.href = url;
      }
    } catch (err: any) {
      console.log("Error creating Stripe Checkout session:", err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 border">
      <Toaster />
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
      {loading ? (
        <Button disabled={loading} className="px-5 pb-10">
          <Loader2Icon className="animate-spin mr-2" /> Processing
        </Button>
      ) : !isLoaded ? (
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
