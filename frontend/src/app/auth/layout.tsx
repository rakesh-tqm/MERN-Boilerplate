"use client";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Children } from "@/types/ui.types";
import { useRouter } from "next/navigation";
import ToastWrapper from "@/common/ui/Wrappers/ToastWrapper";
import { lsEmail, lsPassword, lsToken } from "@/common/constant/variables";

const AuthLayout: React.FC<Children> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    auth();
  }, []);

  const auth = () => {
    const token = localStorage.getItem(lsToken);
    if (token) {
      router.push("/dashboard");
      toast.error("Access Denied");
    }
  };

  return (
    <ToastWrapper>
    <div className="bg-slate-200 min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-md shadow-md">
        {children}
      </div>
    </div>
    </ToastWrapper>
  );
};

export default AuthLayout;
