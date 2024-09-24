"use client";
import React, { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { Children } from "@/types/ui.types";

const ToastWrapper: React.FC<Children> = ({ children }) => {
  return (
    <Fragment>
      {children}
      <Toaster position="top-right" />
    </Fragment>
  );
};

export default ToastWrapper;
