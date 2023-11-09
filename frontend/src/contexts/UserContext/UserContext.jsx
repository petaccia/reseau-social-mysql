import { createContext } from "react";

const UserContext = createContext({
  users: [],
  currentUser: {},
  getAllUsers: () => {},
  getUser: () => {},
  addUser: () => {},
  updateUser: () => {},
  updateUserImage: () => {},
  deleteUser: () => {},
  currentUserLogin: () => {},
});

export default UserContext;
