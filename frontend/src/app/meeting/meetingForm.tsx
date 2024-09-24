
import Button from "@/common/ui/Button";
import CheckInput from "@/common/ui/CheckInput";
import { Input } from "@/common/ui/Input";
import { Label } from "@/common/ui/Label";
import Select from "@/common/ui/Select";
import TextArea from "@/common/ui/Textarea";
import { IsValid } from "@/common/utils/formValidation";
import { meetingValidationSchema } from "@/common/validations/validationSchema";
import React, { useState } from "react";
import { createMeeting, getSingleMeeting, setMeetingFormValues, updateMeeting } from "./meetingSlice";
import { OnChangeTypes } from "@/types/ui.types";
import useOnChange from "@/lib/customHooks/useOnChange";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { trimAndRemoveEmpty } from "@/lib/utils";
import { meetingAttendesContact, meetingFormUUID } from "@/common/constant/variables";
import { newFieldValidation } from "@/common/utils/NewFieldUtil";
import { FormValuesType } from "@/common/utils/formTypes";
import useNotify from "@/lib/customHooks/useNotify";
import NotifyMsg from "@/common/ui/NotifyMsg";
import CustomField from "@/common/components/customField/CustomField";


const MeetingForm: React.FC = () => {
    const [msgType, setMsgType] = useState<"error" | "success">("error");
    const [apiError, setApiError] = useState<string>("");
    const onChange = useOnChange();
    const { meetingFormValues, formMode, meetingId } = useAppSelector((state) => state?.meeting);
    const { fields } = useAppSelector((state) => state.customField);
    const { auth } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const { verifyStatus } = useNotify();
    const { id: loggedInId } = auth;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMsgType("error");
        setApiError("");
        let ErrorTxt: any = "";
        for (let key in meetingValidationSchema) {
            let validRes = IsValid(
                meetingValidationSchema[key],
                meetingFormValues[key] as string,
                key
            );
            if (typeof validRes === "string") {
                ErrorTxt = validRes;
                break;
            }
        }
        ErrorTxt = newFieldValidation(ErrorTxt, fields, meetingFormValues);
        if (typeof ErrorTxt === "string" && ErrorTxt?.length) {
            setApiError(ErrorTxt);
            setMsgType("error");
            return false;
        }
        const values = trimAndRemoveEmpty({
            ...meetingFormValues,
            loggedInId: loggedInId as string,
        }) as FormValuesType;
        if (formMode === "create") {
            const response: any = await dispatch(createMeeting(values));
            verifyStatus(response, true, "/meeting");
            return;
        }

        if (formMode === "update") {
            const response: any = await dispatch(updateMeeting(meetingFormValues));
            verifyStatus(response, true, "/meeting");
            return;
        }
    }

    const changeHandler: OnChangeTypes = (name, value, checked, type) => {
        onChange(meetingFormValues, setMeetingFormValues, name, value, type, checked);
    }


    return (
        <div className="py-4 px-8">
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div >
                    <div className="flex flex-col gap-2 ">
                        <Label htmlFor="firstName">Agenda</Label>
                        <Input
                            type="text"
                            id="agenda"
                            name="agenda"
                            placeholder="Enter agenda"
                            onChange={changeHandler}
                            value={meetingFormValues.agenda}
                            validator={meetingValidationSchema.agenda}
                        />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <Label htmlFor="lastName">Choose preferred Attendes Contact</Label>
                        <Select
                            name="attendesContact"
                            onChange={changeHandler}
                            options={meetingAttendesContact}
                            value={meetingFormValues.attendesContact as string}
                            validator={meetingFormValues.attendesContact}
                        />
                    </div>




                    <div className="flex flex-col gap-2">
                        <Label>Related To</Label>
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-4">
                                <CheckInput
                                    type="radio"
                                    name="relatedTo"
                                    value="contacts"
                                    formData={meetingFormValues}
                                    onChange={changeHandler}

                                />
                                <label className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-6 text-gray-900">
                                    Contacts
                                </label>
                            </div>

                            <div className="flex items-center gap-4">
                                <CheckInput
                                    type="radio"
                                    name="relatedTo"
                                    value="opportunity"
                                    formData={meetingFormValues}
                                    onChange={changeHandler}

                                />
                                <label className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-6 text-gray-900">
                                    Opportunity
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 ">
                        <Label htmlFor="firstName">Location</Label>
                        <Input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Enter location"
                            onChange={changeHandler}
                            value={meetingFormValues.location as string}
                            validator={meetingValidationSchema.location}
                        />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <Label htmlFor="firstName">Date time</Label>
                        <Input
                            type="date"
                            id="dateTime"
                            name="dateTime"
                            onChange={changeHandler}
                            value={meetingFormValues.dateTime as string}
                            validator={meetingValidationSchema.dateTime}
                        />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <Label htmlFor="firstName">Notes</Label>
                        <TextArea
                            id="notes"
                            name="notes"
                            placeholder="Enter notes"
                            onChange={changeHandler}
                            value={meetingFormValues.notes as string}
                            validator={meetingValidationSchema.notes}
                        />
                    </div>
                    <div>
                        <CustomField
                            onChange={changeHandler}
                            formType={meetingFormUUID}
                            fetchId={meetingId as string}
                            formValues={meetingFormValues}
                            fetchData={getSingleMeeting as any}
                            setFormValues={setMeetingFormValues}
                        />

                        {apiError && (
                            <NotifyMsg
                                msg={apiError}
                                msgType={msgType}
                                setApiError={setApiError}
                            />
                        )}
                        <div className="flex items-center justify-center">
                            <Button type="submit" className="w-[250px]">{formMode.toUpperCase()}</Button>
                        </div>
                    </div>


                </div>
            </form>
        </div>
    )
}

export default MeetingForm;