import React from "react";
import { cn } from "@/lib/utils";
import { IoIosArrowForward } from "react-icons/io";

const Breadcrumb: React.FC<{ labels: string[]; className?: string }> = ({
  labels,
  className,
}) => {
  if (labels.length === 1) {
    return (
      <div className={cn("py-1 px-8", className)}>
        <p className="text-gray-900 font-normal text-xs">{labels[0]}</p>
      </div>
    );
  }
  return (
    <div className={cn("py-1 px-8 flex items-center", className)}>
      {labels.map((label, index) => (
        <React.Fragment key={index}>
          <p className="text-gray-500 font-normal text-xs">{label}</p>
          {index !== labels.length - 1 && (
            <span className="mx-1 text-gray-900">{<IoIosArrowForward />}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
