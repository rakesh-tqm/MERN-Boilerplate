"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/common/ui/Button";
import { Input } from "@/common/ui/Input";
import { Label } from "@/common/ui/Label";
import NotifyMsg from "@/common/ui/NotifyMsg";
import { OnChangeTypes } from "@/types/ui.types";
import useOnChange from "@/lib/customHooks/useOnChange";
import { IsValid } from "@/common/utils/formValidation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { confirmEmail, setForgetPasswordValues } from "@/app/auth/AuthSlice";
import { emailValidationSchema } from "@/common/validations/validationSchema";
import useNotify from "@/lib/customHooks/useNotify";

export default function ForgotPassword() {
  const { forgetPasswordValues } = useAppSelector((state) => state.auth);
  const [msgType, setMsgType] = useState<"error" | "success">("error");
  const [apiError, setApiError] = useState("");
  const { email } = emailValidationSchema;
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();
  const onChange = useOnChange();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let ErrorTxt = "";
    setApiError("");

    for (let key in emailValidationSchema) {
      const validation = emailValidationSchema[key];
      const value = forgetPasswordValues[key];
      let validRes = IsValid(validation, value, key);

      if (typeof validRes === "string") {
        ErrorTxt = validRes;
        break;
      }
    }

    if (typeof ErrorTxt === "string" && ErrorTxt?.length) {
      setApiError(ErrorTxt);
      return false;
    }

    const response = await dispatch(confirmEmail(forgetPasswordValues));
    verifyStatus(response, true, "/auth/change-password");

    // try {
    //   const response = await axiosAPI.post(
    //     FORETPASSWORD,
    //     forgetPasswordValues,
    //     {
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   );

    //   if (response?.data?.description) {
    //     setApiError(response?.data?.description);
    //     setMsgType("success");
    //   } else {
    //     setApiError("Something went wrong.");
    //     setMsgType("error");
    //   }
    // } catch (err) {
    //   if (axios.isAxiosError(err)) {
    //     const errMsg = err.response?.data?.message;
    //     setApiError(errMsg);
    //     setMsgType("error");
    //   } else {
    //     setApiError("Something went wrong.");
    //     setMsgType("error");
    //   }
    // }
  };

  const changeHandler: OnChangeTypes = (name, value, checked, type) =>
    onChange(
      forgetPasswordValues,
      setForgetPasswordValues,
      name,
      value,
      type,
      checked
    );

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
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center justify-between">
              <Label>Email</Label>
            </div>
            <div>
              <Input
                type="text"
                name="email"
                validator={email}
                placeholder="Email"
                onChange={changeHandler}
                value={forgetPasswordValues.email}
              />
            </div>
          </div>

          <div>
            {apiError && (
              <NotifyMsg
                msg={apiError}
                msgType={msgType}
                setApiError={setApiError}
              />
            )}

            <Button type="submit">Forgot Password</Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
