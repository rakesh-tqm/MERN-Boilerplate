import { AxiosInstance } from "axios";
import auth from "@/app/api/mock/auth";
import MockAdapter from "axios-mock-adapter";
import company from "@/app/api/mock/company";
import contacts from "@/app/api/mock/contacts";
import meeting from "@/app/api/mock/meeting";
import dashboard from "@/app/api/mock/dashboard";
import opportunity from "@/app/api/mock/opportunity";
import dynamicFields from "@/app/api/mock/customFields";

import {
  MOCK_COMPANY,
  MOCK_SIGN_IN,
  MOCK_SIGN_UP,
  MOCK_CONTACT,
  MOCK_CONTACTS,
  MOCK_COMPANIES,
  MOCK_DYNAMIC_FIELD,
  MOCK_DASHBOARD_TEST,
  MOCK_DYNAMIC_FIELDS,
  MOCK_RESET_PASSWORD,
  MOCK_FORGET_PASSWORD,
  MOCK_UPDATE_PASSWORD,
  MOCK_OPPORTUNITY,
  MOCK_OPPORTUNITIES,
  MOCK_OPPORTUNITY_DETAILS,
  MOCK_MEETING,
  MOCK_MEETINGS,
  MOCK_TASK_RELATEDTO_OPTIONS,
  MOCK_TASK,
  MOCK_TASKS,
  MOCK_DETAILED_TASK,
} from "@/common/constant/Endpoints";
import tasks from "./tasks";

export default function applyMockAdapter(axiosInstance: AxiosInstance) {
  var mock = new MockAdapter(axiosInstance);

  // POST METHODS
  mock.onPost(MOCK_SIGN_UP).reply(auth.signUp);
  mock.onPost(MOCK_SIGN_IN).reply(auth.authCheck);
  mock.onPost(MOCK_CONTACT).reply(contacts.addContact as any);
  mock.onPost(MOCK_RESET_PASSWORD).reply(auth.resetPassword);
  mock.onPost(MOCK_DYNAMIC_FIELD).reply(dynamicFields.addField);
  mock.onPost(MOCK_COMPANY).reply(company.addCompany as any);
  mock.onPost(MOCK_FORGET_PASSWORD).reply(auth.checkEmail);
  mock.onPost(MOCK_OPPORTUNITY).reply(opportunity.add);
  mock.onPost(MOCK_MEETING).reply(meeting.addMeeting as any);
  mock.onPost(MOCK_TASK).reply(tasks.add);

  // GET METHOD
  mock.onGet(MOCK_CONTACTS).reply(contacts.getAllContact as any);
  mock.onGet(new RegExp(MOCK_CONTACT)).reply(contacts.getSingleContact as any);
  mock.onGet(MOCK_DASHBOARD_TEST).reply(dashboard.testDashboard as any);
  mock.onGet(MOCK_DYNAMIC_FIELDS).reply(dynamicFields.allFields);
  mock.onGet(MOCK_COMPANIES).reply(company.getAllCompanies as any);
  mock.onGet(new RegExp(MOCK_COMPANY)).reply(company.getSingleCompany as any);
  mock.onGet(new RegExp(MOCK_OPPORTUNITIES)).reply(opportunity.getAll);
  mock.onGet(new RegExp(MOCK_OPPORTUNITY)).reply(opportunity.getSingle);
  mock.onGet(new RegExp(MOCK_OPPORTUNITY_DETAILS)).reply(opportunity.detailed);
  mock.onGet(new RegExp(MOCK_MEETING)).reply(meeting.getAllMeetings as any);
  mock.onGet(new RegExp(MOCK_MEETINGS)).reply(meeting.getSingleMeeting as any);
  mock.onGet(new RegExp(MOCK_TASK_RELATEDTO_OPTIONS)).reply(tasks.getRealtedTo);
  mock.onGet(new RegExp(MOCK_DETAILED_TASK)).reply(tasks.detailed);
  mock.onGet(new RegExp(MOCK_TASK)).reply(tasks.getSingle);
  mock.onGet(MOCK_TASKS).reply(tasks.getAll);

  // DELETE METHOD
  mock.onDelete(new RegExp(MOCK_COMPANY)).reply(company.deleteCompany as any);
  mock.onDelete(new RegExp(MOCK_CONTACT)).reply(contacts.deleteContact as any);
  mock.onDelete(new RegExp(MOCK_OPPORTUNITY)).reply(opportunity.deleteOpp);
  mock.onDelete(new RegExp(MOCK_TASK)).reply(tasks.deleteTask);
  mock
    .onDelete(new RegExp(MOCK_DYNAMIC_FIELD))
    .reply(dynamicFields.deleteField as any);
  mock.onDelete(new RegExp(MOCK_MEETING)).reply(meeting.deleteMeeting as any);

  // PATCH METHOD
  mock.onPatch(new RegExp(MOCK_CONTACT)).reply(contacts.updateContact as any);
  mock.onPatch(new RegExp(MOCK_COMPANY)).reply(company.updateCompany as any);
  mock.onPatch(new RegExp(MOCK_OPPORTUNITY)).reply(opportunity.update);
  mock.onPatch(MOCK_UPDATE_PASSWORD).reply(auth.updatePassword);
  mock.onPatch(new RegExp(MOCK_TASK)).reply(tasks.update);
  mock.onPatch(new RegExp(MOCK_MEETING)).reply(meeting.updateMeeting as any);
}
