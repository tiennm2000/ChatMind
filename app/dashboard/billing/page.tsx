"use client";
import { Button } from "@/components/ui/button";
import { createCustomerPortalSession } from "@/actions/stripe";

export default function Billing() {
  const handleClick = async () => {
    const response = await createCustomerPortalSession();
    window.location.href = response as string;
  };

  return (
    <div>
      <div
        className="p-10 mx-5 mb-5 rounded-lg bg-gradient-to-r from-slate-200 via-slate-300 to-slate-500
     dark:from-slate-800 dark:via-slate-700 dark:to-slate-600
     flex flex-col justify-center"
      >
        <h1 className="text-xl">Billing</h1>
        <p>Manage your subscription plan</p>
      </div>

      <div className="p-5">
        <Button onClick={handleClick}>Access Stripe Customer Portal</Button>
      </div>
    </div>
  );
}
