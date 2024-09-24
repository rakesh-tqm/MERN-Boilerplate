import React from "react";
import { DashboardCardProps } from "@/types/ui.types";

const DashboardCard: React.FC<DashboardCardProps> = ({ label, value }) => {
  return (
    <div className="flex items-center justify-center flex-col border px-8 py-4 bg-primary h-[100px] text-white min-w-[270px]">
      <h2 className="text-md mb-1">{label}</h2>
      <p className="font-bold mb-2">{value}</p>
    </div>
  );
};

export default DashboardCard;
