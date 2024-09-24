"use client";
import React from "react";
import Layout from "@/common/ui/Layout";

interface PropsType {
  children: React.ReactNode;
}

const LeadsLayout: React.FC<PropsType> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default LeadsLayout;
