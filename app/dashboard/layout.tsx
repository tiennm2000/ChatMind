import MobileNav from "@/components/nav/mobile-nav";
import SideNav from "@/components/nav/side-nav";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen">
      <div className="h-full w-1/4 hidden md:block">
        <SideNav />
      </div>

      <div className="flex flex-col md:flex-row flex-1 w-full">
        <div className="md:hidden w-full">
          <MobileNav />
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
