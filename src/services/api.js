//import axios from "axios";
import TokenService from "./token.service";
/*
const instance = axios.create({
  baseURL: "https://test.orenkontur.ru/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/auth/signin" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post("/auth/refreshtoken", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

let method;

const apiOFF = {
  [method]: (url, bodyObject) => fetch('https://test.orenkontur.ru/api' + url, {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'x-access-token': TokenService.getLocalAccessToken()
    },
    body: bodyObject && JSON.stringify(bodyObject)
  }).then(response => response.json())
}
*/
const api = {
  get: (url) => fetch('https://test.orenkontur.ru/api' + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'x-access-token': TokenService.getLocalAccessToken()
    }
  }).then(response => response.text()).then(data => ({ data })),

  post: (url, bodyObject) => fetch('https://test.orenkontur.ru/api' + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'x-access-token': TokenService.getLocalAccessToken()
    },
    body: bodyObject && JSON.stringify(bodyObject)
  }).then(response => response.json()).then(data => ({ data }))
}

export default api;
//export default instance;
