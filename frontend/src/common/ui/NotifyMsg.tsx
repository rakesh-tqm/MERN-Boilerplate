"use client";
import React from "react";
import clsx from "clsx";
import { IoMdClose } from "react-icons/io";
import { NotifyMsgType } from "@/types/ui.types";

const NotifyMsg: React.FC<NotifyMsgType> = ({ msg, msgType, setApiError }) => {
  const classes =
    msgType === "error"
      ? "border-red-400 text-red-700"
      : "border-green-400 text-green-700";

  const mainClass = clsx(
    `bg-red-100 border mt-4 mb-2 pl-4 flex items-center justify-center py-3 rounded  ${classes}`
  );

  return (
    <div role="alert" className={mainClass}>
      <span className="block sm:inline text-sm text-pretty w-[90%]">{msg}</span>
      <span className="px-4 py-3 cursor-pointer">
        <IoMdClose onClick={() => setApiError("")} />
      </span>
    </div>
  );
};

export default NotifyMsg;
