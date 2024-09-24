import React from "react";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { IoMdMenu } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/app/auth/AuthSlice";
import { lsEmail, lsPassword, lsToken } from "../constant/variables";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem(lsEmail);
    localStorage.removeItem(lsToken);
    localStorage.removeItem(lsPassword);
    router.push("/auth/signin");
    toast.success("Logged Out");
  };

  return (
    <header className="w-screen h-[70px] py-4 px-4 sm:px-6 lg:px-8  text-center shadow-lg bg-primary">
      <div className="flex items-center w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="text-[25px] p-1 cursor-pointer lg:hidden transition-all duration-300">
              <IoMdMenu />
            </span>
            <h1 className="font-bold text-xl text-white">TQM-CRM</h1>
          </div>
          <div>
            <Button  onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
