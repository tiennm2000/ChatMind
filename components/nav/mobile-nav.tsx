"use client";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import SideNav from "./side-nav";

export default function MobileNav() {
  return (
    <div>
      <div className="p-4 mb-2 bg-slate-200 dark:bg-slate-900">
        <Sheet>
          <SheetTrigger>
            <Menu size={30} />
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] ">
            <div className="mt-5"></div>
            <SideNav />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
