import React from "react";
import { ReactNode } from "react";

export type NavigationItemProp = {
  name: string;
  icon?: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  path: string;
  isToggleCollapse?: boolean;
  submenu?: NavigationItemProp[];
  isDefaultOpen?: boolean;
};

export type NavigationGroupItemProp = {
  group: string;
  icon?: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  items: NavigationItemProp[];
};

// define the breadcrumb prop types which we have to used for the path segments
export type BreadcrumbItemWrapperProps = {
  segment: string;
  isLast: boolean;
  breadcrumbPath: string;
};

// CardProps.tsx

export interface DashboardInfoCardProps {
  icon: ReactNode;
  title: string;
  value: string;
}

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}
