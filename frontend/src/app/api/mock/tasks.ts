import opportunityDB from "@/app/fakeDB/opportunityDb";
import contactsData from "@/app/fakeDB/contacts";
import { authMiddleware } from "./mockMiddleware";
import tasksDb from "@/app/fakeDB/tasksDb";
import { v4 as uuid } from "uuid";
import { FormValuesType } from "@/common/utils/formTypes";
import { removeKeys } from "@/lib/utils";

type Response = [number, { [key: string]: {} }];

const getRealtedTo = async (config: any): Promise<Response> => {
  const isAuth = await authMiddleware(config);
  const loggedInId = config.headers.userId;
  const related = config.url.split("/")[5];

  if (!isAuth || !loggedInId || !related) {
    return [401, { data: { message: "Invalid Token", status: 401 } }];
  }

  let data: any = [];
  if (related === "contact") {
    const myContacts = contactsData.filter((c) => c.createdBy === loggedInId);
    data = myContacts.map(({ firstName, lastName, id }) => ({
      label: `${firstName} ${lastName}`,
      value: id,
    }));
  } else if (related === "opportunity") {
    const myOpportunities = opportunityDB.filter(
      (o) => o.createdBy === loggedInId
    );

    data = myOpportunities.map(({ id, name }) => ({ value: id, label: name }));
  }

  return [200, { data: { data } }];
};

const add = async (config: any): Promise<Response> => {
  const isAuth = await authMiddleware(config);
  const loggedInId = config.headers.userId;
  const data = JSON.parse(config.data);

  if (!isAuth || !loggedInId) {
    return [401, { data: { message: "Invalid Token", status: 401 } }];
  }

  const taskId = uuid();
  tasksDb.push({ id: taskId, ...data, createdBy: loggedInId } as never);

  return [201, { data: { message: "Task added." } }];
};

const getAll = async (config: any): Promise<Response> => {
  const isAuth = await authMiddleware(config);
  const loggedInId = config.headers.userId;
  if (!isAuth || !loggedInId) {
    return [401, { data: { message: "Invalid Token", status: 401 } }];
  }

  const loggedInUserTasks = tasksDb.filter((t) => t.createdBy === loggedInId);

  const modifiedTasks = loggedInUserTasks.map((task) => {
    const { assignmentToLead, relatedTo } = task;
    let leadName: string | undefined = undefined;

    if (relatedTo === "contact") {
      const contact = contactsData.find((c) => c.id === assignmentToLead);
      leadName = contact ? `${contact.firstName} ${contact.lastName}` : "";
    } else if (relatedTo === "opportunity") {
      const opportunity = opportunityDB.find((o) => o.id === assignmentToLead);
      leadName = opportunity ? opportunity.name : "";
    }
    return removeKeys({ ...task, assignmentToLead: leadName }, ["createdBy"]);
  });

  return [200, { data: { data: modifiedTasks } }];
};

const deleteTask = async (config: any): Promise<Response> => {
  const taskId = config.url.split("/")[4];
  const isAuth = await authMiddleware(config as any);
  const condition = isAuth && taskId != "null";

  if (!condition) {
    return [401, { data: { message: "Invalid Token", status: 401 } }];
  }

  const filterCondition = (c: any) => c.id === taskId;

  for (let i = 0; i < tasksDb.length; i++) {
    if (filterCondition(tasksDb[i])) {
      tasksDb.splice(i, 1);
      i--;
    }
  }
  return [200, { data: { message: "Task Deleted" } }];
};

const detailed = async (config: any): Promise<Response> => {
  const taskId = config.url.split("/")[4];
  const isAuth = await authMiddleware(config);
  const condition = taskId != "null" && isAuth;

  if (!condition) {
    return [401, { data: { message: "Invalid Token", status: 401 } }];
  }

  let leadName: string | undefined = undefined;
  const task = tasksDb.find((t) => t.id === taskId);

  if (task?.relatedTo === "contact") {
    const contact = contactsData.find((c) => c.id === task?.assignmentToLead);
    leadName = contact ? `${contact.firstName} ${contact.lastName}` : "";
  } else if (task?.relatedTo === "opportunity") {
    const opportunity = opportunityDB.find(
      (o) => o.id === task?.assignmentToLead
    );
    leadName = opportunity ? opportunity.name : "";
  }

  const modifiedTask = removeKeys({ ...task, assignmentToLead: leadName }, [
    "createdBy",
  ]);

  return [200, { data: { data: modifiedTask } }];
};

const getSingle = async (config: any): Promise<Response> => {
  const isAuth = await authMiddleware(config);
  const taskId = config.url.split("/")[4];
  const condition = taskId != "null" && isAuth;

  if (!condition) {
    return [401, { data: { message: "Invalid Token", status: 401 } }];
  }

  const task = tasksDb.find((t) => t.id === taskId);
  return [200, { data: { data: task } }];
};

const update = async (config: any): Promise<Response> => {
  const data = JSON.parse(config.data);
  const taskId = config.url.split("/")[4];
  const isAuth = await authMiddleware(config as any);
  const condition = taskId != "null" && isAuth;

  if (!condition) {
    return [401, { data: { message: "Invalid Token", status: 401 } }];
  }

  const index = tasksDb.findIndex((o) => o.id === taskId);

  if (index === -1) {
    return [404, { data: { message: "Task not found" } }];
  }

  tasksDb[index] = { ...tasksDb[index], ...data };
  return [200, { data: { message: "Task Updated" } }];
};

export default {
  getRealtedTo,
  deleteTask,
  getSingle,
  detailed,
  update,
  getAll,
  add,
};
