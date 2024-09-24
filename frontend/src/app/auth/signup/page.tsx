"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/common/ui/Button";
import { toast } from "react-hot-toast";
import { Label } from "@/common/ui/Label";
import { Input } from "@/common/ui/Input";
import { useRouter } from "next/navigation";
import NotifyMsg from "@/common/ui/NotifyMsg";
import CheckInput from "@/common/ui/CheckInput";
import { OnChangeTypes } from "@/types/ui.types";
import { IsValid } from "@/common/utils/formValidation";
import useOnChange from "@/lib/customHooks/useOnChange";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import DotSpinner from "@/common/components/Loaders/DotSpinner";
import { signUpValidationSchema } from "@/common/validations/validationSchema";
import {
  signupUser,
  setSignupValues,
  resetSignupValues,
} from "@/app/auth/AuthSlice";

const SignUp: React.FC = () => {
  const { signupValues, loading } = useAppSelector((state) => state.auth);
  const [msgType, setMsgType] = useState<"error" | "success">("error");
  const [apiError, setApiError] = useState<string>("");
  const inputChangeHandler = useOnChange();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleChange: OnChangeTypes = (name, value, checked?, type?) => {
    inputChangeHandler(
      signupValues,
      setSignupValues,
      name,
      value,
      type,
      checked
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { firstName, lastName, email, terms, password, confirmPassword } =
      signupValues;

    setApiError("");
    setMsgType("error");

    let ErrorTxt = "";
    for (let key in signUpValidationSchema) {
      let validRes = IsValid(
        signUpValidationSchema[key],
        signupValues[key] || "",
        key as string
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

    if (password !== confirmPassword) {
      toast.error("Password and confirm password do not match");
      return false;
    }

    if (!terms.length) {
      toast.error("Please agree to the terms and conditions");
      return false;
    }

    const response: any = await dispatch(
      signupUser({ firstName, lastName, email, password })
    );

    if (response.type.includes("fulfilled")) {
      const { message } = response.payload.data.data;
      dispatch(resetSignupValues());
      router.push("/auth/signin");
      toast.success(message);
    } else if (response.type.includes("rejected")) {
      const { message } = response.payload.data;
      toast.error(message);
    }
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
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <div className="">
              <Input
                type="text"
                id="firstName"
                name="firstName"
                autoComplete="firstName"
                placeholder="First Name"
                onChange={handleChange}
                value={signupValues.firstName as string}
                validator={signUpValidationSchema.firstName}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="lastName">Last Name</Label>
            </div>
            <div className="">
              <Input
                type="text"
                id="lastName"
                name="lastName"
                autoComplete="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                value={signupValues.lastName as string}
                validator={signUpValidationSchema.lastName}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email">Email</Label>
            </div>
            <div className="">
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
                onChange={handleChange}
                value={signupValues.email as string}
                validator={signUpValidationSchema.email}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <div className="">
              <Input
                showPassword
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="password"
                onChange={handleChange}
                value={signupValues.password as string}
                validator={signUpValidationSchema.password}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
            </div>
            <div className="">
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
                autoComplete="confirmPassword"
                placeholder="Confirm Password"
                value={signupValues.confirmPassword as string}
                validator={signUpValidationSchema.confirmPassword}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center h-5">
                <CheckInput
                  id="terms"
                  name="terms"
                  value="terms"
                  type="checkbox"
                  onChange={handleChange}
                  formData={signupValues}
                />
              </div>
              <Label htmlFor="terms">
                I agree with the{" "}
                <Link
                  href="#"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  terms and conditions
                </Link>
              </Label>
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
            {loading ? <DotSpinner /> : <Button type="submit">Sign Up</Button>}
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account!{" "}
          <Link
            href="/auth/signin"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login Here
          </Link>
        </p>
      </div>
    </React.Fragment>
  );
};
export default SignUp;
