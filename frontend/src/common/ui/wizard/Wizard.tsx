"use client";
import React from "react";
import Button from "@/common/ui/Button";
import Step from "@/common/ui/wizard/Step";
import { WizardProps } from "@/types/common/index.type";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrentStep } from "@/common/ui/wizard/wizardSlice";

const Wizard: React.FC<WizardProps> = ({
  steps,
  onSubmit,
  isForm = false,
}) => {
  const { currentStep } = useAppSelector((state) => state.wizard);
  const dispatch = useAppDispatch();

  const isLastStep = currentStep === steps.length;
  const isFirstStep = currentStep === 1;
  const btnClasses = isFirstStep
    ? "justify-end"
    : isLastStep
    ? "justify-start"
    : "justify-between";

  const nextStep = () => {
    dispatch(
      setCurrentStep(currentStep < steps.length ? currentStep + 1 : currentStep)
    );
  };

  const prevStep = () => {
    dispatch(setCurrentStep(currentStep > 1 ? currentStep - 1 : currentStep));
  };

  return (
    <div className="flex flex-col items-center w-[80%] mx-auto mb-12">
      <div className="steps w-full flex items-center justify-center p-4">
        {steps.map((step, index) => {
          if (steps.length > 0)
            return (
              <Step
                id={step.id}
                key={step.id}
                index={index}
                totalSteps={steps.length}
                currentStep={currentStep}
              />
            );
        })}
      </div>
      <div className="step-content mt-8 p-4 border rounded-lg">
        {isForm ? (
          <form className="py-12" onSubmit={onSubmit}>{steps[currentStep - 1].component}</form>
        ) : (
          steps[currentStep - 1].component
        )}
      </div>
      <div className={`navigation-buttons flex ${btnClasses} mt-4 w-full px-4`}>
        {!isFirstStep && (
          <Button onClick={prevStep} className="w-[120px] select-none">
            Previous
          </Button>
        )}
        {!isLastStep && (
          <Button onClick={nextStep} className="w-[120px] select-none">
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Wizard;