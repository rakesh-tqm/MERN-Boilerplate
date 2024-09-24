import { v4 as uuid } from "uuid";
import companies from "@/app/fakeDB/companyDB";
import contactsData from "@/app/fakeDB/contacts";
import { authMiddleware } from "./mockMiddleware";
import opportunities from "@/app/fakeDB/opportunityDb";

type Response = [number, { [key: string]: {} }];

const add = async (config: any): Promise<Response> => {
  const isAuth = await authMiddleware(config);
  const { data, id } = JSON.parse(config.data);

  if (!isAuth || !id) {
    return [401, { data: { message: "Invalid Token", status: 401 } }];
  }

  const isAlready = opportunities.some((o) => o.email === data.email);

  if (isAlready) {
    return [409, { data: { message: "This email is already in use" } }];
  }

  const oppId = uuid();
  opportunities.push({ id: oppId, ...data, createdBy: id } as never);

  return [201, { data: { message: "Opportunity added." } }];
};

const getAll = async (config: any): Promise<Response> => {
  const isAuth = await authMiddleware(config);
  const id = config.headers.userId;

  if (!id || !isAuth) {
    return [401, { data: { message: "Invalid Token", status: 401 } }];
  }

  const myOpportunities = opportunities.filter((o) => o.createdBy === id);

  const updated = myOpportunities.map((o) => {
    const companyName = companies.find((c) => c.id === o.company)?.company_name;
    return { ...o, company: companyName };
  });

  return [200, { data: { data: updated } }];
};

const getSingle = async (config: any): Promise<Response> => {
  const isAuth = await authMiddleware(config);
  const opportunityId = config.url.split("/")[4];
  const condition = opportunityId != "null" && isAuth;

  if (!condition) {
    return [401, { data: { message: "Invalid Token", status: 401 } }];
  }

  const opportunity = opportunities.find((o) => o.id === opportunityId);
  return [200, { data: { data: opportunity } }];
};

const update = async (config: any): Promise<Response> => {
  const data = JSON.parse(config.data);
  const opportunityId = config.url.split("/")[4];
  const isAuth = await authMiddleware(config as any);
  const condition = opportunityId != "null" && isAuth;

  if (!condition) {
    return [401, { data: { message: "Invalid Token", status: 401 } }];
  }

  const index = opportunities.findIndex((o) => o.id === opportunityId);

  if (index === -1) {
    return [404, { data: { message: "Opportunity not found" } }];
  }

  opportunities[index] = { ...opportunities[index], ...data };
  return [200, { data: { message: "Opportunity Updated" } }];
};

const deleteOpp = async (config: any): Promise<Response> => {
  const opportunityId = config.url.split("/")[4];
  const isAuth = await authMiddleware(config as any);
  const condition = isAuth && opportunityId != "null";

  if (!condition) {
    return [401, { data: { message: "Invalid Token", status: 401 } }];
  }

  const filterCondition = (c: any) => c.id === opportunityId;

  for (let i = 0; i < opportunities.length; i++) {
    if (filterCondition(opportunities[i])) {
      opportunities.splice(i, 1);
      i--;
    }
  }
  return [200, { data: { message: "Opportunity Deleted" } }];
};

const detailed = async (config: any): Promise<Response> => {
  const opportunityId = config.url.split("/")[4];
  const isAuth = await authMiddleware(config);
  const condition = opportunityId != "null" && isAuth;

  if (!condition) {
    return [401, { data: { message: "Invalid Token", status: 401 } }];
  }

  const opportunity = opportunities.find((o) => o.id === opportunityId);
  const companyId = opportunity?.company;
  const contactId = opportunity?.contactPerson;
  const company = companies.find((c) => c.id === companyId);
  const contact = contactsData.find((c) => c.id === contactId);
  const contactName = `${contact?.firstName} ${contact?.lastName}`;

  return [
    200,
    {
      data: {
        data: {
          ...opportunity,
          company: company?.company_name,
          contactPerson: contactName,
        },
      },
    },
  ];
};

export default { add, getAll, getSingle, update, deleteOpp, detailed };
