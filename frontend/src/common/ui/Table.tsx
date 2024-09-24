"use client";
import React from "react";
import { TableProps } from "@/types/ui.types";

const Table: React.FC<TableProps> = ({ children }) => {
  return <table className="border-collapse w-full">{children}</table>;
};

export default Table;
