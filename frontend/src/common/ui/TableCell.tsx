"use cleint";
import React from "react";
import { Children } from "@/types/ui.types";

const TableCell: React.FC<Children> = ({ children }) => {
  return (
    <td className=" py-2 border-b border-gray-200 bg-white text-xs">
      {children}
    </td>
  );
};

export default TableCell;
