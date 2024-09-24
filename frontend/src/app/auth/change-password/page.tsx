"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/common/ui/Button";
import { Input } from "@/common/ui/Input";
import { Label } from "@/common/ui/Label";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import NotifyMsg from "@/common/ui/NotifyMsg";
import { OnChangeTypes } from "@/types/ui.types";
import useOnChange from "@/lib/customHooks/useOnChange";
import { setChangePasswordValues, updatePassword } from "@/app/auth/AuthSlice";
import { changePasswordValidationSchema } from "@/common/validations/validationSchema";
import { IsValid } from "@/common/utils/formValidation";
import { lsForgetEmail } from "@/common/constant/variables";
import useNotify from "@/lib/customHooks/useNotify";

const ForgotPassword: React.FC = () => {
  const { changePasswordValues } = useAppSelector((state) => state.auth);
  const [msgType, setMsgType] = useState<"error" | "success">("error");
  const { password, confirmPassword } = changePasswordValidationSchema;
  const [apiError, setApiError] = useState("");
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();
  const onChange = useOnChange();

  const changeHandler: OnChangeTypes = (name, value, checked, type) =>
    onChange(
      changePasswordValues,
      setChangePasswordValues,
      name,
      value,
      type,
      checked
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let ErrorTxt = "";
    setApiError("");

    for (let key in changePasswordValidationSchema) {
      const validation = changePasswordValidationSchema[key];
      const value = changePasswordValues[key];
      let validRes = IsValid(validation, value, key);

      if (typeof validRes === "string") {
        ErrorTxt = validRes;
        break;
      }
    }

    const { password, confirmPassword } = changePasswordValues;

    if (typeof ErrorTxt === "string" && ErrorTxt?.length) {
      setApiError(ErrorTxt);
      return false;
    }

    if (password !== confirmPassword) {
      setApiError("Password and confirm password doesn't match");
      return;
    }

    const email = localStorage.getItem(lsForgetEmail);
    const values = { ...changePasswordValues, email };
    const response = await dispatch(updatePassword(values));
    verifyStatus(response, true, "/auth/signin");
  };

  return (
    <React.Fragment>
      <div className="text-center">
        <Image
          src="/images/logo1.png"
          height="20"
          width="80"
          alt="test"
          className="mx-auto"
        />
        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Change your password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center justify-between">
              <Label>Password</Label>
            </div>
            <div>
              <Input
                showPassword
                name="password"
                type="password"
                validator={password}
                placeholder="Password"
                autoComplete="password"
                onChange={changeHandler}
                value={changePasswordValues.password}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label>Confirm Password</Label>
            </div>
            <div>
              <Input
                type="password"
                name="confirmPassword"
                onChange={changeHandler}
                validator={confirmPassword}
                autoComplete="confirmPassword"
                placeholder="Confirm Password"
                value={changePasswordValues.confirmPassword}
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

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ForgotPassword;
