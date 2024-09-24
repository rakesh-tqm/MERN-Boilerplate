"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { LabelProps } from "@/types/ui.types";

const Label: React.FC<LabelProps> = ({ className, children, ...props }) => {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-6 text-gray-900",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
};

export { Label };
