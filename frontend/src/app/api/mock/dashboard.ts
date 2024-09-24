import { authMiddleware } from "./mockMiddleware";

const testDashboard = async (config: { headers: any }) => {
  const isAuth = await authMiddleware(config);
  if (isAuth) {
    return [200, { data: [] }];
  }
  return [401, { data: { message: "Invalid Token", status: 401 } }];
};

const test = () => {};

export default { test, testDashboard };
