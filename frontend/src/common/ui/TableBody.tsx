"use client";
import React from "react";
import { Children } from "@/types/ui.types";

const TableBody: React.FC<Children> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export default TableBody;
