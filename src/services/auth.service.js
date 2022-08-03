import api from "./api";
import CryptoJS from "crypto-js";
var accessToken;

const login = (loginName, password) => {
  return api
    .post("/auth", {
      login: loginName,
      password: CryptoJS.SHA256(password).toString()
    })
    .then((response) => {
      if (response.data.accessToken) {
        updateLocalTokens(response.data);
      }

      return response.data;
    });
};

const logout = () => {
  removeUser();
};

const getCurrentUser = () => {
  return getUser();
};

const getLocalRefreshToken = () => localStorage.getItem("refreshToken");

const getLocalAccessToken = () => accessToken;

const updateLocalTokens = (data) => {
  accessToken = data.accessToken;
  localStorage.setItem("refreshToken", data.refreshToken);
}

const getUserFromJwt = () => {
  const tokenPayLoad = atob(getLocalAccessToken().split('.')[1]);
  console.log('tokenPayLoad: ' + tokenPayLoad);
  return { username: JSON.parse(tokenPayLoad).login }
}

const getUser = async () => {
  if (getLocalAccessToken()) {
    return getUserFromJwt();
  } else {
    if (getLocalRefreshToken()) {
      const response = await api.post("/auth", { refreshToken: getLocalRefreshToken() });
      //console.log(response);
      if (response && response.data) {
        updateLocalTokens(response.data);
        return getUserFromJwt();
      }
    }
  }
};

const removeUser = () => {
  localStorage.removeItem("refreshToken");
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalTokens,
  getUser,
  removeUser,
};

export default AuthService;
