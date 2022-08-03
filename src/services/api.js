import AuthService from "./auth.service";

//const baseUrl = 'http://192.168.1.175:8080/api';
//const baseUrl = 'http://192.168.78.159:8080/api';
const baseUrl = 'http://localhost:8080/api';
//const baseUrl = 'https://test.orenkontur.ru/api';
//const baseUrl = 'http://192.168.78.22/1c-jwt-master/hs/api';

let lastArguments;

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

const customFetch = (method, url, bodyObject) => fetch(baseUrl + url, {
  method,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    //'x-access-token': AuthService.getLocalAccessToken(),
    Authorization: 'Bearer ' + AuthService.getLocalAccessToken()
  },
  body: bodyObject && JSON.stringify(bodyObject)
})
.then(response => {
  // console.log(response);
 
  if (response.status == 401) return api.post("/auth", {
    refreshToken: AuthService.getLocalRefreshToken(),
  })
  .then(response => {
    AuthService.updateLocalTokens(response.data);
    return customFetch(method, url, bodyObject)
  });
  return readBodyResponse(response);
})

const api = {
  get: (url) => customFetch('GET', url),
  post: (url, bodyObject) => customFetch('POST', url, bodyObject)
}

export default api;
