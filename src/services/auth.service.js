import api from "./api";
import TokenService from "./token.service";

const login = (username, password) => {
  return api
    .post("/auth", {
      username,
      password
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
