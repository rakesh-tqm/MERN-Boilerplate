import users from "@/app/fakeDB/users";
import { addMinutesToTimestamp } from "@/lib/utils";
import { authMiddleware } from "./mockMiddleware";

interface SignIn {
  email?: string;
  password?: string;
}

interface SignUp {
  email?: string;
  lastName?: string;
  password?: string;
  firstName?: string;
}

interface ResetPassword {
  email?: string;
  password?: string;
}

const signUp = async (config: {
  data?: SignUp;
}): Promise<[number, { [key: string]: {} }]> => {
  const condition = config?.data && typeof config.data === "string";

  if (condition) {
    let jsonData = config.data as string;
    const { firstName, lastName, email, password } = JSON.parse(jsonData);
    const isAlreadyUser = users.filter((user) => user.email === email);

    if (isAlreadyUser.length > 0) {
      return [409, { data: { message: "This email is already in use" } }];
    }

    const userId = `${Number(users[users.length - 1].id) + 1}`;
    const values = { id: userId, firstName, lastName, email, password };
    users.push(values);

    return [201, { data: { message: "Sing Up successfully" } }];
  }

  return [401, { data: { message: "Invalid credentials" } }];
};

const authCheck = async (config: {
  data?: SignIn;
}): Promise<[number, { [key: string]: {} }]> => {
  const condition = config?.data && typeof config.data === "string";

  if (condition) {
    let jsonData = config.data as string;
    const { email, password } = JSON.parse(jsonData);

    if (!email || !password) {
      return [401, { data: { message: "Invalid credentials" } }];
    }

    const foundUser = users.find((u: any) => u.email === email);

    if (!foundUser) {
      return [400, { data: { message: "Invalid credentials" } }];
    }

    const isValidPassword = foundUser.password === password;

    if (!isValidPassword) {
      return [400, { data: { message: "Invalid credentials" } }];
    }

    const token = addMinutesToTimestamp(20);

    const data = {
      token,
      id: foundUser.id,
      message: "Logged In successfuly",
    };

    return [200, { data }];
  }
  return [401, { data: { message: "Invalid credentials" } }];
};

const resetPassword = async (config: {
  data?: ResetPassword;
}): Promise<[number, { [key: string]: {} }]> => {
  const condition = config?.data && typeof config.data === "string";

  if (condition) {
    let jsonData = config.data as string;
    const { email, password } = JSON.parse(jsonData);
    const isAlreadyUser = users.filter((user) => user.email === email);

    if (isAlreadyUser.length === 0) {
      return [400, { data: { message: "Invalid credentials" } }];
    }

    users.forEach((user) => {
      if (user.email === email) {
        user.password = password;
      }
    });

    return [200, { data: { message: "Password Updated" } }];
  }
  return [400, { data: { message: "Invalid credentials" } }];
};

const checkEmail = async (config: any) => {
  const { email } = JSON.parse(config.data);
  const invalid = { message: "Invalid Email address" };
  if (email) {
    const token = { email, token: addMinutesToTimestamp(5) };
    const validEmail = users.some((u) => u.email === email);
    return validEmail ? [200, { data: token }] : [404, { data: invalid }];
  }
  return [400, { data: invalid }];
};

const updatePassword = async (config: any) => {
  const { email, password } = JSON.parse(config.data);
  const isAuth = await authMiddleware(config);

  if (isAuth) {
    const validEmail = users.some((u) => u.email === email);

    if (validEmail) {
      const index = users.findIndex((c) => c.email === email);
      users[index].password = password;
      return [200, { data: { message: "Password Updated" } }];
    }

    return [400, { data: { message: "User Not found" } }];
  }
  return [401, { data: { message: "Invalid Token", status: 401 } }];
};

export default { resetPassword, authCheck, signUp, checkEmail, updatePassword };
