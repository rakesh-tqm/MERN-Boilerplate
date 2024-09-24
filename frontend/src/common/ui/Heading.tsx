
"use client";
import React, { Fragment } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { HeadingProps } from "@/types/ui.types";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAppDispatch } from "@/lib/hooks";

const Heading: React.FC<HeadingProps> = ({
  label,
  addPath,
  addLabel,
  backPath,
  modalSetter,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onlyLabel = !backPath && !addPath && !addLabel && label;
  const labelWithBack = backPath && !addPath && !addLabel && label;
  const labelWithAddButton = !backPath && addPath && label && addLabel;
  const labelAndPopup =
    Boolean(label) &&
    Boolean(addLabel) &&
    Boolean(!addPath) &&
    Boolean(!backPath);

  const modelToggleHandler = () => dispatch(modalSetter(true));

  const labelContent = (
    <h1 className="font-bold text-xl text-primary">{label}</h1>
  );

  const classValues = onlyLabel
    ? "justify-start"
    : labelWithAddButton || labelAndPopup
      ? "justify-between"
      : "gap-4";

  return (
    <div className="pt-4 pb-1 px-8">
      <div className={`flex items-center ${classValues}`}>
        {onlyLabel && labelContent}
        {labelWithAddButton && (
          <Fragment>
            {labelContent}
            <Button
              variant="link"
              onClick={() => router.push(addPath as string)}
              className="w-[100px] text-xs font-normal hover:bg-cyan-600"
            >
              {addLabel}
            </Button>
          </Fragment>
        )}

        {labelAndPopup && (
          <Fragment>
            {labelContent}
            <Button
              variant="link"
              onClick={modelToggleHandler}
              className="w-[100px] text-xs font-normal hover:bg-cyan-600"
            >
              {addLabel}
            </Button>
          </Fragment>
        )}

        {labelWithBack && (
          <Fragment>
            <span
              title="Back"
              onClick={() => router.push(backPath)}
              className="cursor-pointer p-2 text-xl hover:bg-gray-200 text-gray-500 rounded-full"
            >
              <IoMdArrowRoundBack />
            </span>
            {labelContent}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Heading;

