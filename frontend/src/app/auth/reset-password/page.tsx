"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/common/ui/Button";
import { Label } from "@/common/ui/Label";
import { Input } from "@/common/ui/Input";
import NotifyMsg from "@/common/ui/NotifyMsg";
import { OnChangeTypes } from "@/types/ui.types";
import useOnChange from "@/lib/customHooks/useOnChange";
import { IsValid } from "@/common/utils/formValidation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import DotSpinner from "@/common/components/Loaders/DotSpinner";
import { resetPassword, setResetPasswordValues } from "@/app/auth/AuthSlice";
import { resetPasswordValidationSchema } from "@/common/validations/validationSchema";
import useNotify from "@/lib/customHooks/useNotify";

const ResetPassword: React.FC = () => {
  const { email, password, confirmPassword } = resetPasswordValidationSchema;
  const [msgType, setMsgType] = useState<"error" | "success">("error");
  const { auth } = useAppSelector((state) => state);
  const { loading, resetPasswordValues } = auth;
  const [apiError, setApiError] = useState("");
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();
  const onChange = useOnChange();

  const changeHandler: OnChangeTypes = (name, value, checked, type) =>
    onChange(
      resetPasswordValues,
      setResetPasswordValues,
      name,
      value,
      type,
      checked
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, confirmPassword } = resetPasswordValues;

    setApiError("");
    let ErrorTxt = "";

    for (let key in resetPasswordValidationSchema) {
      const validation = resetPasswordValidationSchema[key];
      const value = resetPasswordValues[key];
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

    if (password !== confirmPassword) {
      setApiError("Password and confirm password do not match");
      return false;
    }

    const response = await dispatch(resetPassword({ email, password }));
    verifyStatus(response, true, "/auth/signin");
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
          Reset Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email">Email</Label>
            </div>
            <div>
              <Input
                id="email"
                type="email"
                name="email"
                validator={email}
                placeholder="Email"
                autoComplete="email"
                onChange={changeHandler}
                value={resetPasswordValues.email}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="newPassword">Password</Label>
            </div>
            <div>
              <Input
                showPassword
                id="password"
                name="password"
                type="password"
                validator={password}
                placeholder="Password"
                autoComplete="password"
                onChange={changeHandler}
                value={resetPasswordValues.password}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
            </div>
            <div>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={changeHandler}
                validator={confirmPassword}
                autoComplete="confirmPassword"
                placeholder="Confirm Password"
                value={resetPasswordValues.confirmPassword}
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
            {loading ? <DotSpinner /> : <Button type="submit">Submit</Button>}
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ResetPassword;
