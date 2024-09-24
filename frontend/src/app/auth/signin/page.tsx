"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/common/ui/Button";
import { toast } from "react-hot-toast";
import { Input } from "@/common/ui/Input";
import { Label } from "@/common/ui/Label";
import { useRouter } from "next/navigation";
import NotifyMsg from "@/common/ui/NotifyMsg";
import CheckInput from "@/common/ui/CheckInput";
import { OnChangeTypes } from "@/types/ui.types";
import useOnChange from "@/lib/customHooks/useOnChange";
import { IsValid } from "@/common/utils/formValidation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import DotSpinner from "@/common/components/Loaders/DotSpinner";
import { lsEmail, lsPassword, lsToken } from "@/common/constant/variables";
import { singInValidationSchema } from "@/common/validations/validationSchema";
import {
  loginUser,
  setLoginValues,
  resetLoginValues,
} from "@/app/auth/AuthSlice";

const SignIn: React.FC = () => {
  const { loginValues, loading } = useAppSelector((state) => state.auth);
  const [msgType, setMsgType] = useState<"error" | "success">("error");
  const [apiError, setApiError] = useState<string>("");
  const inputChangeHandler = useOnChange();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem(lsEmail);
    const password = localStorage.getItem(lsPassword);
    const condition = email && password;
    if (condition) {
      dispatch(setLoginValues({ email, password, rememberMe: [] }));
    }
  }, []);

  const handleChange: OnChangeTypes = (name, value, checked?, type?) => {
    inputChangeHandler(loginValues, setLoginValues, name, value, type, checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password, rememberMe } = loginValues;

    setApiError("");
    setMsgType("error");

    let ErrorTxt = "";
    for (let key in singInValidationSchema) {
      let validRes = IsValid(
        singInValidationSchema[key],
        (loginValues[key] as string) || "",
        key as "email" | "password"
      );

      if (typeof validRes === "string") {
        ErrorTxt = validRes;
        break;
      }
    }

    if (typeof ErrorTxt === "string" && ErrorTxt?.length) {
      setApiError(ErrorTxt);
      setMsgType("error");
      return false;
    }

    const response: any = await dispatch(loginUser({ email, password }));

    if (response.type.includes("rejected")) {
      const { message } = response.payload.data;
      toast.error(message);
      return;
    } else if (response.type.includes("fulfilled")) {
      const { token, message } = response.payload.data.data;
      if (rememberMe?.length) {
        localStorage.setItem(lsEmail, loginValues.email as string);
        localStorage.setItem(lsPassword, loginValues.password as string);
      } else {
        localStorage.removeItem(lsEmail);
        localStorage.removeItem(lsPassword);
      }
      localStorage.setItem(lsToken, token as string);
      dispatch(resetLoginValues());
      router.push("/dashboard");
      toast.success(message);
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
        <h2 className=" text-center text-2xl font-bold leading-9 text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email">Email</Label>
            </div>
            <div className="mt-2">
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={loginValues.email as string}
                validator={singInValidationSchema.email}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <div className="text-sm">
                <Link
                  href="/auth/forgot-password"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <Input
                showPassword
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={loginValues.password as string}
                validator={singInValidationSchema.password}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center h-5">
              <CheckInput
                id="terms"
                type="checkbox"
                name="rememberMe"
                value="rememberMe"
                formData={loginValues}
                onChange={handleChange}
              />
            </div>
            <Label htmlFor="terms">Remember Me</Label>
          </div>

          <div>
            {apiError && (
              <NotifyMsg
                msg={apiError}
                msgType={msgType}
                setApiError={setApiError}
              />
            )}

            <div className="flex items-center justify-center">
              {loading ? (
                <DotSpinner />
              ) : (
                <Button type="submit">Sign In</Button>
              )}
            </div>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Create your account!{" "}
          <Link
            href="/auth/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register Here
          </Link>
        </p>

        <p className="mt-6 text-center text-sm text-gray-500">
          Want to Reset password{" "}
          <Link
            href="/auth/reset-password"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Click here
          </Link>
        </p>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
