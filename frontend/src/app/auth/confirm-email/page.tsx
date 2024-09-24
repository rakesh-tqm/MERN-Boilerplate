"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Button from "@/common/ui/Button";
import { Input } from "@/common/ui/Input";
import axiosAPI from "@/common/DefaultAxios";
import { useAppSelector } from "@/lib/hooks";
import { Label } from "@radix-ui/react-label";
import NotifyMsg from "@/common/ui/NotifyMsg";
import { CONFIRMEMAIL } from "@/common/constant/Endpoints";
import { setConfirmEmailValues } from "@/app/auth/AuthSlice";

const ConfirmEmail: React.FC = () => {
  const { confirmEmailValues } = useAppSelector((state) => state.auth);
  const [msgType, setMsgType] = useState<"error" | "success">("error");
  const [apiError, setApiError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axiosAPI.post(CONFIRMEMAIL, confirmEmailValues, {
        headers: { "Content-Type": "application/json" },
      });

      if (response?.data?.description) {
        setApiError(response?.data?.description);
        setMsgType("success");
      } else {
        setApiError("Something went wrong.");
        setMsgType("error");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errMsg = err.response?.data?.message;
        setApiError(errMsg);
        setMsgType("error");
      } else {
        // console.error("Unknown error:", err);
        setApiError("Something went wrong.");
        setMsgType("error");
      }
    }
  };

  return (
    <React.Fragment>
      <div className="text-center">
        <Image
          alt="test"
          width="80"
          height="20"
          className="mx-auto"
          src="/images/logo1.png"
        />

        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Confirm Email
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email">Email</Label>
              </div>
              <div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  formData={confirmEmailValues}
                  setformData={setConfirmEmailValues}
                  value={confirmEmailValues.email as string}
                />
              </div>
            </div>

            <div className="mt-4">
              {apiError && (
                <NotifyMsg
                  msg={apiError}
                  msgType={msgType}
                  setApiError={setApiError}
                />
              )}

              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ConfirmEmail;
