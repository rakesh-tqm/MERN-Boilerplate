import { v4 as uuid } from "uuid";
import { removeKeys } from "@/lib/utils";
import companies from "@/app/fakeDB/companyDB";
import { authMiddleware } from "./mockMiddleware";
import { FormValuesType } from "@/common/utils/formTypes";

type Response = [number, { [key: string]: {} }];

interface Headers {
  userId: string;
}

const addCompany = async (config: {
  data?: string;
  headers: Headers;
}): Promise<Response> => {
  const { headers, data } = config;
  const loggedInId = headers.userId;
  const isAuth = await authMiddleware(config as any);

  if (isAuth && loggedInId) {
    const parsedData = JSON.parse(data as string);

    const isAlready = companies.some(
      (c: FormValuesType) => c.company_email === parsedData.company_email
    );

    if (isAlready) {
      return [400, { data: { message: "This email is already in use." } }];
    }

    const values = {
      id: uuid(),
      ...parsedData,
      created_by: loggedInId,
    } as FormValuesType;

    (companies as any).push(values);
    return [201, { data: { message: "Company added." } }];
  }

  return [401, { data: { message: "Invalid Token", status: 401 } }];
};

const getAllCompanies = async (config: any): Promise<Response> => {
  const loggedInId = config.headers.userId;
  const isAuth = await authMiddleware(config as any);

  if (loggedInId && isAuth) {
    const myCompanies = companies.filter((c) => c.created_by === loggedInId);
    return [200, { data: { data: myCompanies } }];
  }
  return [401, { data: { message: "Invalid Token", status: 401 } }];
};

const getSingleCompany = async (config: any): Promise<Response> => {
  const isAuth = await authMiddleware(config);
  const companyId = config.url.split("/")[4];
  const condition = companyId != "null" && isAuth;
  if (condition) {
    const company = companies.find(
      (company) => company.id === companyId
    ) as FormValuesType;

    const updatedCompany = removeKeys(company, ["created_by"]);
    return [200, { data: { data: updatedCompany } }];
  }

  return [401, { data: { message: "Invalid Token", status: 401 } }];
};

const updateCompany = async (config: { url: string; data: string }) => {
  const companyId = config.url.split("/")[4];
  const isAuth = await authMiddleware(config as any);
  const condition = companyId != "null" && isAuth;

  if (condition) {
    const { data } = config;
    const parsedData = JSON.parse(data);
    const index = companies.findIndex((c) => c.id === companyId);

    if (index !== -1) {
      companies[index] = { ...companies[index], ...parsedData };
      return [200, { data: { message: "Company Updated" } }];
    }

    return [401, { data: { message: "Invalid Token", status: 401 } }];
  }
};

const deleteCompany = async (config: { url: string }) => {
  const companyId = config.url.split("/")[4];
  const isAuth = await authMiddleware(config as any);
  const condition = isAuth && companyId != "null";

  if (condition) {
    const condition = (c: FormValuesType) => c.id === companyId;

    for (let i = 0; i < companies.length; i++) {
      if (condition(companies[i])) {
        companies.splice(i, 1);
        i--;
      }
    }

    return [200, { data: { message: "Company Deleted" } }];
  }

  return [401, { data: { message: "Invalid Token", status: 401 } }];
};

export default {
  addCompany,
  getAllCompanies,
  getSingleCompany,
  updateCompany,
  deleteCompany,
};
