import Link from "next/link";
import clsx from "clsx";
import { MouseEvent, useState } from "react";
import { NavigationItemProp } from "@/types/index";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

export function NavigationItem({
  name,
  icon: Icon,
  path,
  isToggleCollapse,
  submenu = [],
  isDefaultOpen = true,
}: NavigationItemProp) {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(isDefaultOpen);

  // Check if the current page (asPath) is active based on exact path match or path prefix.
  const isActive = pathname === path || pathname?.startsWith(`${path}/`);

  // Toggle the submenu's open/close state when triggered by a click event,
  // preventing navigation if there are child items.
  const toggleSubMenu = (
    event: MouseEvent<HTMLElement>,
    childItem: NavigationItemProp[],
  ) => {
    if (childItem && childItem?.length > 0) event.preventDefault();
    setOpen(!open);
  };

  return (
    <div>
      <Link
        href={path}
        onClick={(event) => toggleSubMenu(event, submenu)}
        className={clsx(
          "relative flex flex-row items-center h-11 focus:outline-none hover:bg-accent pr-6 rounded-md hover:text-accent-foreground",
          {
            "bg-accent": isActive,
          },
        )}
      >
        {Icon && (
          <span className="inline-flex justify-center items-center ml-4">
            <Icon className={`${isToggleCollapse ? "w-6" : "w-5"}`} />
          </span>
        )}
        {!isToggleCollapse && (
          <>
            <span className="ml-3 flex-1 truncate whitespace-nowrap text-left text-sm tracking-wide">
              {name}
            </span>
            {submenu?.length > 0 &&
              (open ? (
                <ChevronUp className="w-5" />
              ) : (
                <ChevronDown className="w-5" />
              ))}
          </>
        )}
      </Link>
      {!isToggleCollapse && open && submenu?.length > 0 && (
        <ul className="ml-5 space-y-2 py-2">
          {submenu.map((child) => (
            <li key={`${child.name}-${child.path}`}>
              <NavigationItem {...child} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
