import React from "react";
import { Children } from "@/types/ui.types";

const MainCard: React.FC<Children> = ({ children }) => {
  return <div className="py-4 px-8">{children}</div>;
};

export default MainCard;
