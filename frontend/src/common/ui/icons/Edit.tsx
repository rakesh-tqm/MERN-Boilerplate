"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { IconButtonProps } from "@/types";
import { MdModeEdit } from "react-icons/md";

const Edit: React.FC<IconButtonProps> = ({ className, ...props }) => {
  return (
    <span
      className={cn(
        "text-[18px] cursor-pointer p-1 rounded text-slate-600 border border-transparent hover:border-amber-500 hover:text-amber-500",
        className
      )}
      title="Edit"
      {...props}
    >
      <MdModeEdit />
    </span>
  );
};

export default Edit;
