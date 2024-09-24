import { FormValuesType } from "@/common/utils/formTypes";
import React from "react";
import { ValidationTypes, ValidatorType } from "./common/index.type";
import { PayloadActionCreator } from "@reduxjs/toolkit";

export interface Children {
  children: React.ReactNode;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: any;
  children: React.ReactNode;
  variant?: "submit" | "primary" | "secondary" | "link";
}

export interface CheckInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: PayloadActionCreator<FormValuesType> | any;
  validator?: ValidatorType[];
  formData?: FormValuesType;
  options?: any;
}

export interface RadioButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: any;
  formData?: any;
  options?: any;
  value?: any;
}

export interface DashboardCardProps {
  label: string;
  value: string;
}

export interface NotifyMsgType {
  msg: string;
  msgType: "error" | "success";
  setApiError: (value: string) => void;
}

export interface HeadingProps {
  label: string;
  addLabel?: string;
  addPath?: string;
  backPath?: string;
  modalSetter?: any;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: PayloadActionCreator<FormValuesType> | any;
  validator?: ValidatorType[];
  showPassword?: boolean;
}

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  validator?: ValidatorType[];
  onChange: React.Dispatch<React.SetStateAction<FormValuesType>> | any;
  formData?: FormValuesType;
}

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export interface TableHeaderProps {
  headers: string[];
}

type CustomChangeHandler = (name: string, value: string) => void;

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  showPassword?: boolean;
  validator?: any[];
  onChange: CustomChangeHandler | any;
}

export type OnChangeTypes = (
  name: string,
  value: any,
  checked?: string,
  type?: string
) => void;

export interface SelectOptionsType {
  label: string;
  value: string;
}
