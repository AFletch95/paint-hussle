import axios from 'axios';

export default {
  // create user account
  createNewUser(userData) {
    return axios.post('/api/users/', userData);
  },

  userLogin(userData) {
    return axios.post('/api/account/login', userData);
  },

  getAccountInfo() {
    return axios.get('/api/account/');
  },

  getUserCanvases() {
    return axios.get('/api/');
  },

  getAuctions(options) {
    return axios.get('/api/auctions/', options);
  },
};
