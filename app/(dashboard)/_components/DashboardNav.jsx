"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

function DashboardNav() {
  const pathname = usePathname();

  const routes = [
    {
      href: `/`,
      label: "Overview",
      active: pathname === `/Overview`,
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
      href: `/dashboard/categories`,
      label: "Categories",
      active: pathname === `/dashboard/categories`,
    },
    {
      href: `/dashboard/contacts`,
      label: "Emails",
      active: pathname === `/dashboard/contacts`,
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
