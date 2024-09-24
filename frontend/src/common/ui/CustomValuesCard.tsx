import React, { Fragment } from "react";
import { FormValuesType } from "../utils/formTypes";
import { modifyFieldName } from "../utils/commonUtils";
import { getObjectKeysArray, removeKeys } from "@/lib/utils";

interface PropsType {
  label?: string;
  values: FormValuesType;
  initialValues: FormValuesType;
}

const CustomValuesCard: React.FC<PropsType> = ({
  label,
  values,
  initialValues,
}) => {
  const heading = label ?? "Additional Informations";
  const toRemoveKeys = getObjectKeysArray(initialValues);
  const objectWithRestValues = removeKeys(values, toRemoveKeys);

  return (
    <Fragment>
      {Object.keys(objectWithRestValues).length > 0 && (
        <div className="rounded overflow-hidden shadow-2xl bg-white w-[80%] mx-auto">
          <div className="px-6 py-4">
            <h1 className="text-lg font-bold">{heading}</h1>
            {Object.keys(objectWithRestValues).map((key) => (
              <p className="text-gray-700 text-base my-1 flex">
                <h2 className="w-[30%] text-sm font-semibold">
                  {modifyFieldName(key)}
                </h2>
                <span className="w-[70%] text-sm text-wrap">
                  {Array.isArray(objectWithRestValues[key])
                    ? objectWithRestValues[key].join(" , ")
                    : objectWithRestValues[key] ?? "N/A"}
                </span>
              </p>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CustomValuesCard;
