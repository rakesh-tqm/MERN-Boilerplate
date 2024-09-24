"use client";

import React, { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ToggleLeft, ToggleRight } from "lucide-react";
import { routes } from "@/lib/routes";
import { NavigationItemProp } from "@/types/index";
import { NavigationItem } from "@/layouts/navigation";

export default function VerticalLayout() {
  const pathname = usePathname();
  const [isCollapsed, setToggleCollapse] = useState(false);

  const wrapperClasses = clsx(
    "h-screen flex bg-background justify-between flex-col transition-width duration-500 ease-in-out",
    {
      "w-64": !isCollapsed,
      "w-20": isCollapsed,
    },
  );

  const collapseIconClasses = clsx(
    "p-4 mt-4 rounded bg-light-lighter absolute right-0 mb-5 w-14",
    {
      "left-8 ": isCollapsed,
    },
  );

  const collapseLogoClasses = clsx("flex ml-5", {
    "md:mr-16": !isCollapsed,
    "md:mr-10 ": isCollapsed,
  });

  const toggleSidebar = () => {
    setToggleCollapse(!isCollapsed);
  };

  // Checks if any child menu is currently active on page load.
  const isAnyChildMenuActive = (
    navigationItems: NavigationItemProp[],
  ): boolean =>
    navigationItems.some(
      (item) => pathname === item.path || pathname?.startsWith(`${item.path}/`),
    );

  return (
    <aside id="default-sidebar" className={wrapperClasses} aria-label="Sidebar">
      <div className="fixed flex flex-col top-0 left-0 bg-primary text-white border-input h-full border-r">
        <div className="flex items-center justify-center pt-4">
          <Link href="/" className={collapseLogoClasses}>
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
              {isCollapsed ? "M" : "Mail Referal"}
            </span>
          </Link>
          <div className={collapseIconClasses}>
            {isCollapsed ? (
              <ToggleLeft className="h-5 w-5" onClick={toggleSidebar} />
            ) : (
              <ToggleRight className="h-5 w-5" onClick={toggleSidebar} />
            )}
          </div>
        </div>

        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            {routes.map((route) => (
              <div className="mb-2" key={`group-${route.group}`}>
                {route.group && !isCollapsed && (
                  <li className="px-5">
                    <div className="flex flex-row items-center h-8">
                      <div className="text-sm font-semibold tracking-wide">
                        {route.group}
                      </div>
                    </div>
                  </li>
                )}

                {route.items.map((menu) => {
                  // Determine if the child menu should be set to default open on page load.
                  const isDefaultOpen =
                    menu?.submenu && menu.submenu?.length > 0
                      ? isAnyChildMenuActive(menu.submenu)
                      : false;
                  return (
                    <li
                      key={menu.name}
                      className={`${
                        !isCollapsed ? "px-2" : "flex justify-center"
                      }`}
                    >
                      <NavigationItem
                        name={menu.name}
                        icon={menu.icon}
                        path={menu.path}
                        submenu={menu.submenu}
                        isToggleCollapse={isCollapsed}
                        isDefaultOpen={isDefaultOpen}
                      />
                    </li>
                  );
                })}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
