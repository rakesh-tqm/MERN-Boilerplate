import React from "react";
import { FaUser } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import Card from "@/common/components/DashboardInfoCard";

export const DashboardCount = () => {
  return (
    <div className="mt-12 grid grid-cols-4 gap-2 text-center ml-[80px]">
      <div>
        <Card
          icon={<FaUser className="mx-auto mb-4 text-2xl" />}
          title="Customers"
          value={"500+"}
        />
      </div>
      <div>
        <Card
          icon={<FaDollarSign className="mx-auto mb-4 text-2xl" />}
          title="Income"
          value={"$980,635"}
        />
      </div>

      <div>
        <Card
          icon={<FaBoxOpen className="mx-auto mb-4 text-2xl" />}
          title="Product Sold"
          value={"750+"}
        />
      </div>

      <div>
        <Card
          icon={<IoIosMail className="mx-auto mb-4 text-2xl" />}
          title="Mail Send"
          value={"800+"}
        />
      </div>
    </div>
  );
};
