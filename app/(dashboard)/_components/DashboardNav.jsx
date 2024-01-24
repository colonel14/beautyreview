"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

function DashboardNav() {
  const pathname = usePathname();

  const routes = [
    {
      href: `/`,
      label: "Home",
    },
    {
      href: `/dashboard`,
      label: "Overview",
      active: pathname === `/dashboard`,
    },
    {
      href: `/dashboard/users`,
      label: "Users",
      active: pathname === `/dashboard/users`,
    },
    {
      href: `/dashboard/products`,
      label: "Products",
      active: pathname === `/dashboard/products`,
    },
    {
      href: `/dashboard/makeup`,
      label: "Makeup",
      active: pathname === `/dashboard/makeup`,
    },
    {
      href: `/dashboard/skincare`,
      label: "Skincare",
      active: pathname === `/dashboard/skincare`,
    },
    {
      href: `/dashboard/ads`,
      label: "Ads",
      active: pathname === `/dashboard/ads`,
    },
    {
      href: `/dashboard/contacts`,
      label: "Emails",
      active: pathname === `/dashboard/contacts`,
    },
    {
      href: `/dashboard/adsContact`,
      label: "Ads Requests",
      active: pathname === `/dashboard/adsContact`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6 mx-6")}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

export default DashboardNav;
