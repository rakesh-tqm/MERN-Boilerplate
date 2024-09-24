// import { MOCK_DASHBOARD_TEST } from "@/common/constant/Endpoints";
import { AxiosRequestConfig } from "axios";

// type UrlPattern = string;
// type Urls = UrlPattern[];

export interface AuthMiddlewareConfig extends AxiosRequestConfig {
  headers: {
    Authorization: string;
  };
}

// const publicUrls = ["/auth/singin", "/auth/signup"];
// const authUrls = [MOCK_DASHBOARD_TEST];

// const matchUrl = (url: string, pattern: UrlPattern): boolean => {
//   const regex = new RegExp(`^${pattern.replace(/\{\*\}/g, "[^/]+")}$`);
//   return regex.test(url);
// };

// const checkURL = (url: string, publicUrls: Urls, authUrls: Urls): boolean => {
//   const isPublic = publicUrls.some((publicUrl) => matchUrl(url, publicUrl));
//   const isAuth = authUrls.some((authUrl) => matchUrl(url, authUrl));

//   if (isPublic) {
//     return true; // URL is public
//   } else if (isAuth) {
//     return false; // URL requires authentication
//   } else {
//     throw new Error(
//       `URL ${url} not found in either public or authentication URLs.`
//     );
//   }
// };

export const authMiddleware = async (config: AuthMiddlewareConfig) => {
  const token = config.headers.Authorization;
  const isValidToken = new Date().getTime() <= Number(token);
  return isValidToken ? config : false;
};
