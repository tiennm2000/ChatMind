"use client";
import Link from "next/link";
import { useUsage } from "../context/usage";
import { Button } from "../ui/button";

export default function Usage() {
  const { count, subscribed } = useUsage();

  const credits = Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE);
  //const percentage = (count / credits) * 100;
  const percentage = subscribed ? 100 : Math.min((count / credits) * 100, 100);

  return (
    <div className="mt-2">
      <div className="rounded-lg shadow p-2 border">
        <h2 className="font-medium">Credits</h2>

        {/* percentage bar */}
        <div className="h-2 w-full rounded-full bg-slate-500 mt-3">
          <div
            className="h-2 rounded-full bg-slate-200"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <h2 className="text-sm my-2">
          {subscribed ? "Unlimited credits" : `${count}/${credits} credit used`}
          {/* {count}/{credits} credit used */}
        </h2>
      </div>

      <Link href="/membership">
        <Button className="w-full my-3 " variant="secondary">
          Upgrade
        </Button>
      </Link>
    </div>
  );
}
