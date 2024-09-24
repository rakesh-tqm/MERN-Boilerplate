"use client";
import React, { useEffect } from "react";
import { BarChart, PieChart } from "../Chart";
import { testDashboard } from "./dashboardSlice";
import DashboardCard from "@/common/ui/DashboardCard";
import DashboardTable from "@/common/ui/Tables/DashboardTable";
import { useAppDispatch } from "@/lib/hooks";
import Breadcrumb from "@/common/ui/Breadcrumb";
import Heading from "@/common/ui/Heading";
import useNotify from "@/lib/customHooks/useNotify";

const contactData = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    company: "ABC Corp",
    jobTitle: "Software Engineer",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    company: "XYZ Inc",
    jobTitle: "Product Manager",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    company: "123 Co",
    jobTitle: "Data Analyst",
  },
  {
    id: "4",
    name: "Bob Brown",
    email: "bob.brown@example.com",
    company: "Acme Ltd",
    jobTitle: "Marketing Coordinator",
  },
  {
    id: "5",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    company: "Tech Innovations",
    jobTitle: "UX Designer",
  },
];

const leadsData = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    source: "Website",
    industry: "Technology",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    source: "Referral",
    industry: "Finance",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice@example.com",
    source: "Social Media",
    industry: "Healthcare",
  },
  {
    id: "4",
    name: "Bob Brown",
    email: "bob@example.com",
    source: "Advertisement",
    industry: "Retail",
  },
  {
    id: "5",
    name: "Emily Wilson",
    email: "emily@example.com",
    source: "Trade Show",
    industry: "Education",
  },
];

const data = [
  { label: "Total Leads", value: "12300+" },
  { label: "Pending Leads", value: "200" },
  { label: "Contacts", value: "4300+" },
  { label: "Total Revenue", value: "$1857510" },
];

export default function Dashboard() {
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();

  const testApi = async () => {
    verifyStatus(await dispatch(testDashboard()), true);
  };

  useEffect(() => {
    testApi();
  }, []);

  return (
    <div className="px-8 py-4 h-[100%] w-[100%]">
      <Heading label="Dashboard" />
      <Breadcrumb labels={["Dashboard"]} />
      <div className="flex flex-wrap items-center justify-evenly my-8">
        {data.map((d, idx) => (
          <DashboardCard key={idx} label={d.label} value={d.value} />
        ))}
      </div>
      <div className="flex w-[100%] items-center justify-center my-8">
        <div className="w-[50%] flex items-center justify-center">
          <BarChart />
        </div>
        <div className="w-[40%] flex items-center justify-center">
          <PieChart />
        </div>
      </div>

      <div className="flex gap-8 w-[90%] mx-auto">
        <div className="w-[50%]">
          <h2 className="text-gray-500 font-semibold text-md">Contacts</h2>
          <DashboardTable
            data={contactData}
            headers={["name", "email", "company", "Job Title"]}
          />
        </div>
        <div className="w-[50%]">
          <h2 className="text-gray-500 font-semibold text-md">Leads</h2>
          <DashboardTable
            data={leadsData}
            headers={["name", "email", "source", "industry"]}
          />
        </div>
      </div>
    </div>
  );
}
