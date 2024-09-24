import { Contact } from "@/types/contacts.types";
import contacts from "@/app/fakeDB/contacts";
import { v4 as uuid } from "uuid";
import { removeKeys } from "@/lib/utils";
import { FormValuesType } from "@/common/utils/formTypes";
import { authMiddleware } from "./mockMiddleware";

type Response = [number, { [key: string]: {} }];

interface Headers {
  userId: string;
}

const addContact = async (config: {
  data?: string;
  headers: Headers;
}): Promise<Response> => {
  const { headers, data } = config;
  const loggedInId = headers.userId;
  const isAuth = await authMiddleware(config as any);

  if (isAuth && loggedInId) {
    const parsedData = JSON.parse(data as string);

    const alreadyContact = contacts.filter(
      (contact: Contact) => contact.email === parsedData.email
    );

    if (alreadyContact.length > 0) {
      return [400, { data: { message: "This email is already in use" } }];
    }

    const newId = uuid();
    const values = { id: newId, ...parsedData, createdBy: loggedInId };
    contacts.push(values);

    return [201, { data: { message: "Contact Added", data: contacts } }];
  }

  return [401, { data: { message: "Invalid Token", status: 401 } }];
};

const getAllContact = async (config: {
  headers: Headers;
}): Promise<Response> => {
  const isAuth = await authMiddleware(config as any);
  const loggedInId = config.headers.userId;

  if (loggedInId && isAuth) {
    const loggedInUserContacts = contacts.filter(
      (contact) => contact.createdBy === loggedInId
    );

    return [200, { data: { data: loggedInUserContacts } }];
  }

  return [401, { data: { message: "Invalid Token", status: 401 } }];
};

const deleteContact = async (config: {
  url: string;
  data: string;
}): Promise<Response> => {
  const isAuth = await authMiddleware(config as any);
  const contactId = config.url.split("/")[4];
  const condition = contactId != "null" && isAuth;

  if (condition) {
    const condition = (obj: Contact) => obj.id === contactId;

    for (let i = 0; i < contacts.length; i++) {
      if (condition(contacts[i])) {
        contacts.splice(i, 1);
        i--;
      }
    }

    return [200, { data: { message: "Contact Deleted" } }];
  }

  return [401, { data: { message: "Invalid Token", status: 401 } }];
};

const updateContact = async (config: any): Promise<Response> => {
  const isAuth = await authMiddleware(config as any);
  const contactId = config.url.split("/")[4];
  const condition = contactId != "null" && isAuth;

  if (condition) {
    const { data } = config;
    const parsedData = JSON.parse(data);

    const index = contacts.findIndex(
      (contact: Contact) => contact.id === contactId
    );

    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...parsedData };
    }

    return [200, { data: { message: "Contact Updated" } }];
  }
  return [401, { data: { message: "Invalid Token", status: 401 } }];
};

const getSingleContact = async (config: { url: string }): Promise<Response> => {
  const isAuth = await authMiddleware(config as any);
  const contactId = config.url.split("/")[4];
  const condition = contactId != "null" && isAuth;
  if (condition) {
    const contact = contacts.find((c) => c.id === contactId) as FormValuesType;
    const updatedContact = removeKeys(contact, ["createdBy"]);
    return [200, { data: { data: updatedContact } }];
  }

  return [401, { data: { message: "Invalid Token", status: 401 } }];
};

export default {
  addContact,
  getAllContact,
  deleteContact,
  updateContact,
  getSingleContact,
};
