import React from "react";
import Navbar from "./Navbar";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-[15%] bg-primary text-white hidden lg:block">
      <Navbar />
    </aside>
  );
};
export default Sidebar;
