import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Children } from "@/types/ui.types";
import ToastWrapper from "./Wrappers/ToastWrapper";

const Layout: React.FC<Children> = ({ children }) => {
  return (
    <ToastWrapper>
      <div className="h-screen w-screen flex flex-col m-0 p-0">
        <Header />
        <main className="w-full h-[calc(100vh-70px)] flex">
          <Sidebar />
          <div className="w-[100%] overflow-hidden lg:w-[85%]">
            <div className="h-[calc(100vh-70px)] overflow-x-hidden overflow-y-scroll">
              <div className="min-h-[calc(100vh-70px)] z-0">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </ToastWrapper>
  );
};

export default Layout;
