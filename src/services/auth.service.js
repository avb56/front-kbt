import api from "./api";
import TokenService from "./token.service";
import CryptoJS from "crypto-js";

const login = (loginName, password) => {
  return api
    .post("/auth", {
      login: loginName,
      password: CryptoJS.SHA256(password).toString()
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.updateLocalTokens(response.data);
      }

      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return TokenService.getUser();
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
