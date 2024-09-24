"use client";
import React from "react";
import { TableHeaderProps } from "@/types/ui.types";

const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th
            key={index}
            className="py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
