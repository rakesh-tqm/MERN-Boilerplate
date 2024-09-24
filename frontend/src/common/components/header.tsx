import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";

export const Header = () => {
  return (
    <div className="mt-4 flex gap-4">
      <div className="w-[90%]">
        <h2 className="text-[#293462] text-3xl font-bold ml-20">
          Bussiness Dashboard
        </h2>
      </div>

      <div className="w-[2%] ">
        <FaSearch />
      </div>
      <div className="w-[2%]">
        <FaCalendar />
      </div>
    </div>
  );
};
