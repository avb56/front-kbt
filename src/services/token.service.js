import api from "./api";
//var accessToken;

const getLocalRefreshToken = () => localStorage.getItem("refreshToken");

const getLocalAccessToken = () => window.accessToken;

const updateLocalTokens = (data) => {
  window.accessToken = data.accessToken;
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

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalTokens,
  getUser,
  removeUser,
};

export default TokenService;
