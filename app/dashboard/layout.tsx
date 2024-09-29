import SideNav from "@/components/nav/side-nav";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="col-span-1">
        <SideNav />
      </div>
      <div className="col-span-3">{children}</div>
    </div>
  );
}
