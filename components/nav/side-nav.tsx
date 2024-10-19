"use client";
import clsx from "clsx";
import {
  LayoutDashboard,
  FileClock,
  WalletCards,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Usage from "./usage";
import SignUpModal from "../modal/sign-up-modal";

export default function SideNav() {
  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/Billing",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  const path = usePathname();

  return (
    <div className="h-full p-5 shadow-sm border flex flex-col">
      <div className="flex-1 space-y-2">
        {menu.map((item, index) => (
          <Link
            href={item.path}
            key={index}
            className={clsx(
              "flex gap-2 p-2 mb-2 rounded-lg cursor-pointer justify-center  items-center md:justify-start ",
              path === item.path && "text-secondary bg-primary",
              path !== item.path && "hover:text-secondary hover:bg-primary"
            )}
          >
            <item.icon className="w-6 h-6" />
            <span className=" md:inline">{item.name}</span>
          </Link>
        ))}
      </div>

      <div className="pb-20 mt-auto">
        <Usage />
        <SignUpModal />
      </div>
    </div>
  );
}
