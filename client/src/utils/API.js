import axios from "axios";

export default {

  // create user account
  createNewUser(userData) {
    return axios.post("/api/users/", userData)
  },

  userLogin(userData) {
    return axios.post("/api/account/login", userData)
  },




}