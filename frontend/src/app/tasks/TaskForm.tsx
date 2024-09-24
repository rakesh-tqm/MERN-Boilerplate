"use client";
import React, { useEffect, useState } from "react";
import Button from "@/common/ui/Button";
import Select from "@/common/ui/Select";
import { Label } from "@/common/ui/Label";
import { Input } from "@/common/ui/Input";
import TextArea from "@/common/ui/Textarea";
import NotifyMsg from "@/common/ui/NotifyMsg";
import CheckInput from "@/common/ui/CheckInput";
import { OnChangeTypes } from "@/types/ui.types";
import useNotify from "@/lib/customHooks/useNotify";
import useOnChange from "@/lib/customHooks/useOnChange";
import { IsValid } from "@/common/utils/formValidation";
import { taskFormUUID } from "@/common/constant/variables";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { newFieldValidation } from "@/common/utils/NewFieldUtil";
import CustomField from "@/common/components/customField/CustomField";
import { taskValidationSchema } from "@/common/validations/validationSchema";

import {
  addTask,
  setFormValues,
  getRelatedToOptions,
  getTask,
  updateTask,
} from "@/app/tasks/tasksSlice";

const TaskForm: React.FC = () => {
  const { auth, task, customField } = useAppSelector((state) => state);
  const { formMode, formValues, taskId, relatedToOptions } = task;
  const [relatedToFlag, setRelatedToFlag] = useState("");
  const [msgType] = useState<"error" | "success">("error");
  const [apiError, setApiError] = useState("");
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();
  const onChange = useOnChange();
  const { fields } = customField;
  const { id } = auth;

  useEffect(() => {
    if (formMode === "create") {
      const updateFormValues = { ...formValues, relatedTo: "contact" };
      dispatch(setFormValues(updateFormValues));
      fetchReatedToOptions("contact");
    }
    if (formMode === "update") {
      getFilledRealtedToValue(taskId as string);
    }
  }, []);

  useEffect(() => {
    if (relatedToFlag) {
      fetchReatedToOptions(relatedToFlag);
    }
  }, [relatedToFlag]);

  const getFilledRealtedToValue = async (id: string) => {
    const response: any = await dispatch(getTask(id as string));
    verifyStatus(response, true);
    if (response.type.includes("rejected")) return;
    const task = response.payload.data.data.data;
    setRelatedToFlag(task.relatedTo);
    return task;
  };

  const fetchReatedToOptions = async (relatedTo: string) => {
    const fetchResp = await dispatch(getRelatedToOptions({ relatedTo, id }));
    verifyStatus(fetchResp, true);
  };

  const radioChangeHandler: OnChangeTypes = async (
    name,
    value,
    checked,
    type
  ) => {
    await fetchReatedToOptions(value as string);
    onChange(formValues, setFormValues, name, value, type, checked);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setApiError("");
    let ErrorTxt: any = "";

    for (let key in taskValidationSchema) {
      const value = formValues[key];
      const validation = taskValidationSchema[key];
      let validRes = IsValid(validation, value, key);

      if (typeof validRes === "string") {
        ErrorTxt = validRes;
        break;
      }
    }

    ErrorTxt = newFieldValidation(ErrorTxt, fields, formValues);

    if (typeof ErrorTxt === "string" && ErrorTxt?.length) {
      setApiError(ErrorTxt);
      return false;
    }

    if (formMode === "create") {
      const createResp = await dispatch(addTask({ id, data: formValues }));
      verifyStatus(createResp, true, "/tasks");
    } else if (formMode === "update") {
      const updateResp = await dispatch(
        updateTask({ id: taskId, data: formValues })
      );
      verifyStatus(updateResp, true, "/tasks");
    }
  };

  const handleChange: OnChangeTypes = (name, value, checked, type) =>
    onChange(formValues, setFormValues, name, value, type, checked);

  return (
    <div className="py-4 px-8">
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Enter title"
            value={formValues.title}
            validator={taskValidationSchema.title}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Related To</Label>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <CheckInput
                type="radio"
                id="contact"
                name="relatedTo"
                value="contact"
                formData={formValues}
                onChange={radioChangeHandler}
                validator={taskValidationSchema.relatedTo}
              />
              <label
                className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-6 text-gray-900"
                htmlFor="contact"
              >
                Contact
              </label>
            </div>

            <div className="flex items-center gap-4">
              <CheckInput
                type="radio"
                name="relatedTo"
                id="opportunity"
                value="opportunity"
                formData={formValues}
                onChange={radioChangeHandler}
                validator={taskValidationSchema.relatedTo}
              />
              <label
                className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-6 text-gray-900"
                htmlFor="opportunity"
              >
                Opportunity
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Assignment to Lead</Label>
          <Select
            onChange={handleChange}
            name="assignmentToLead"
            options={relatedToOptions}
            value={formValues.assignmentToLead}
            validator={taskValidationSchema.assignmentToLead}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Description</Label>
          <TextArea
            name="description"
            onChange={handleChange}
            value={formValues.description}
            placeholder="Please enter description..."
            validator={taskValidationSchema.description}
          />
        </div>

        <div className="flex items-center gap-8">
          <div className="flex flex-col gap-2 w-[50%]">
            <Label>Start Date</Label>
            <Input
              type="date"
              name="startDate"
              onChange={handleChange}
              value={formValues.startDate}
              min={new Date().toISOString().slice(0, 10)}
              validator={taskValidationSchema.startDate}
            />
          </div>

          <div className="flex flex-col gap-2 w-[50%]">
            <Label>End Date</Label>
            <Input
              type="date"
              name="endDate"
              onChange={handleChange}
              value={formValues.endDate}
              validator={taskValidationSchema.endDate}
              min={new Date().toISOString().slice(0, 10)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>URL</Label>
          <Input
            name="url"
            type="text"
            value={formValues.url}
            onChange={handleChange}
            placeholder="Enter task link"
            validator={taskValidationSchema.url}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Notes</Label>
          <TextArea
            name="notes"
            onChange={handleChange}
            value={formValues.notes}
            placeholder="Enter Notes"
            validator={taskValidationSchema.notes}
          />
        </div>

        <div>
          <CustomField
            fetchData={getTask}
            formType={taskFormUUID}
            formValues={formValues}
            onChange={handleChange}
            fetchId={taskId as string}
            setFormValues={setFormValues}
          />
        </div>

        {apiError && (
          <NotifyMsg
            msg={apiError}
            msgType={msgType}
            setApiError={setApiError}
          />
        )}

        <div className="flex items-center justify-center">
          <Button variant="primary" type="submit" className="w-[250px]">
            {formMode.toUpperCase()}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
