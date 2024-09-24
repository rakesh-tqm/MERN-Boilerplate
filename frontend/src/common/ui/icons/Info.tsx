"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { MdInfo } from "react-icons/md";
import { IconButtonProps } from "@/types";

const Info: React.FC<IconButtonProps> = ({ className, ...props }) => {
  return (
    <span
      className={cn(
        "text-[18px] cursor-pointer p-1 rounded text-slate-600 border border-transparent hover:border-green-800 hover:text-green-800",
        className
      )}
      title="View"
      {...props}
    >
      <MdInfo />
    </span>
  );
};

export default Info;
