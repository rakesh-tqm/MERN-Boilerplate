export interface ValidatorType {
  name:
    | "IsValidPassword"
    | "MobileNumber"
    | "IsRequired"
    | "IsEmail"
    | "MinLength"
    | "MaxLength"
    | "IsNumber"
    | "validateDate"
    | "IsString";
  size?: number | string;
}

export interface ValidationTypes {
  [key: string]: ValidatorType[];
}

export interface StepType {
  id: string;
  component: React.ReactNode;
}

export interface WizardProps {
  steps: StepType[];
  isForm?: boolean;
  onSubmit?: (e: React.ChangeEvent<HTMLFormElement>) => void;
}

export interface StepProps {
  id: string;
  index: number;
  currentStep: number;
  totalSteps: number;
}
