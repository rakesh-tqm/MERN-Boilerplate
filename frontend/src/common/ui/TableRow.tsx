"use client";
import React from "react";
import { Children } from "@/types/ui.types";

const TableRow: React.FC<Children> = ({ children }) => {
  return <tr>{children}</tr>;
};

export default TableRow;
