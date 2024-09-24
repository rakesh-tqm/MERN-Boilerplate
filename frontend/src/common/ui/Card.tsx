"use client";
import React from "react";
import { Children } from "@/types/ui.types";

const Card: React.FC<Children> = ({ children }) => {
  return <div className="shadow-2xl px-8 py-8 bg-[#FBF9F1]">{children}</div>;
};

export default Card;
