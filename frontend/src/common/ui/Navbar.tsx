"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/opportunities", label: "Opportunities" },
  { path: "/companies", label: "Companies" },
  { path: "/contacts", label: "Contacts" },
  { path: "/meeting", label: "Meeting" },
  { path: "/tasks", label: "Tasks" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="py-12">
      <ul className="flex flex-col">
        {routes.map((route, idx) => (
          <Link key={idx} href={route?.path}>
            <li
              className={`cursor-pointer pl-[20%] pr-auto py-2 w-full ${pathname === route.path ? "bg-white text-primary" : ""
                } hover:bg-[#E9E9E9] hover:text-primary`}
            >
              {route?.label}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
