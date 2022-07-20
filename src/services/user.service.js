import api from "./api";

const getPublicContent = () => {
  return api.get("/test");
};

const getUserBoard = () => {
  return api.get("/data");
};

const UserService = {
  getPublicContent,
  getUserBoard
};

export default UserService;
