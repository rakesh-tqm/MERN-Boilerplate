import React, { ReactNode } from "react";
import VerticalLayout from "@/layouts";

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="flex overflow-hidden">
      <VerticalLayout />
      <main id="main-content" className="w-full min-h-screen overflow-y-auto bg-slate-100">
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
};

export default BaseLayout;
