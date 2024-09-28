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
    <div className="h-screen p-5 shadow-sm border">
      {menu.map((item, index) => (
        <Link
          href={item.path}
          key={index}
          className={clsx(
            "flex gap-2 p-2 mb-2 rounded-lg cursor-pointer justify-center  items-center md:justify-start ",
            path === item.path && "text-white bg-primary",
            path !== item.path && "hover:text-white hover:bg-primary"
          )}
        >
          <item.icon />
          <span className="hidden md:inline">{item.name}</span>
        </Link>
      ))}
    </div>
  );
}
