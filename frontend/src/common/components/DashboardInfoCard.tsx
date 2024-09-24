import React from "react";
import { DashboardInfoCardProps } from "@/types";

const Card: React.FC<DashboardInfoCardProps> = ({ icon, title, value }) => (
  <div className="bg-primary text-center text-white w-[80%] p-4 rounded-2xl	">
    {icon}
    <h2 className="text-xl font-bold">{title}</h2>
    <p>{value}</p>
  </div>
);

export default Card;
