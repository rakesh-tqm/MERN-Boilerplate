"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { MdDelete } from "react-icons/md";
import { IconButtonProps } from "@/types/index";

const Trash: React.FC<IconButtonProps> = ({ className, ...props }) => {
  return (
    <span
      className={cn(
        "text-[18px] cursor-pointer p-1 rounded text-slate-600 border border-transparent hover:border-red-600 hover:text-red-600",
        className
      )}
      title="Delete"
      {...props}
    >
      <MdDelete />
    </span>
  );
};

export default Trash;
