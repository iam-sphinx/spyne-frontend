"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../button";
import { usePathname } from "next/navigation";
import { CarFrontIcon, LayoutDashboard, PlusSquare, User2 } from "lucide-react";

const Sidebar = () => {
  const pathNames = usePathname();
  const paths = pathNames.split("/").filter((path) => path);
  console.log(paths);
  const PAGES = [
    {
      Icon: CarFrontIcon,
      label: "cars",
      href: "/cars",
      value: "cars",
    },
    {
      Icon: PlusSquare,
      label: "create",
      href: "/create",
      value: "create",
    },
  ];
  return (
    <aside className="flex-[0.18] flex flex-col z-50 bg-[#100e3d] px-3">
      <span className="text-2xl text-white font-bold text-center mt-6">
        Spyne
      </span>

      <div className="flex flex-col gap-6 mt-12">
        {PAGES.map((page, idx) => (
          <Link
            className={cn(
              buttonVariants({ variant: "default" }),
              "capitalize items-center justify-start h-12",
              paths.includes(page.value)
                ? "bg-[#392eff] hover:bg-[#392eff]/80"
                : "bg-transparent hover:bg-[#4940ff]/40 shadow-none text-muted-foreground hover:text-white"
            )}
            href={page.href}
          >
            <page.Icon size={14} />
            <span>{page.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
