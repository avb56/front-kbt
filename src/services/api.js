import TokenService from "./token.service";
/*
import axios from "axios";
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

export default instance;

*/

const parseType = headers => headers.get('Content-Type').includes('/json') ? 'json' : 'text';
const readBodyResponse = response => response[parseType(response.headers)]()
  .then(data => {
    if (response.ok) {
      response.data = data;
      return response;
    } else {
      response.message = data.message;
      throw(response);
    }
  });
//const baseUrl = 'http://192.168.1.175:8080/api';
//const baseUrl = 'http://192.168.78.159:8080/api';
const baseUrl = 'http://localhost:8080/api';
//const baseUrl = 'https://test.orenkontur.ru/api';

const customFetch = (method, url, bodyObject) => fetch(baseUrl + url, {
  method,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'x-access-token': TokenService.getLocalAccessToken()
  },
  body: bodyObject && JSON.stringify(bodyObject)
})
.then(response => {
  // console.log(response);
 
  if (response.status == 401) return api.post("/auth/refreshtoken", {
    refreshToken: TokenService.getLocalRefreshToken(),
  })
  .then(response => {
    TokenService.updateLocalTokens(response.data);
    return customFetch(method, url, bodyObject)
  });
  return readBodyResponse(response);
  //throw(response.text());
})

const api = {
  get: (url) => customFetch('GET', url),
  post: (url, bodyObject) => customFetch('POST', url, bodyObject)
}

export default api;
