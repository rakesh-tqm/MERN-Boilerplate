"use client";
import React from "react";
import { useAppDispatch } from "@/lib/hooks";
import { StepProps } from "@/types/common/index.type";
import { setCurrentStep } from "@/common/ui/wizard/wizardSlice";

const Step: React.FC<StepProps> = ({ id, index, currentStep, totalSteps }) => {
  const dispatch = useAppDispatch();

  const lineClasses = index + 2 <= currentStep ? "bg-blue-500" : "bg-gray-200";
  const stepClasses = index + 1 <= currentStep ? "bg-blue-500" : "bg-gray-300";

  const handleStepChange = (step: number) => dispatch(setCurrentStep(step));

  return (
    <div className="flex items-center">
      <div
        onClick={() => handleStepChange(index + 1)}
        className={`${stepClasses} text-white text-sm w-[30px] h-[30px] p-2 flex items-center justify-center rounded-full border-0 cursor-pointer`}
      >
        {id}
      </div>
      {Number(id) !== totalSteps && (
        <div
          className={`p-1 h-[4px] w-[300px] border-0 ${lineClasses} transition-all duration-1000 ease-out`}
        ></div>
      )}
    </div>
  );
};

export default Step;
