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

  getAuctions(options) {
    return axios.get('/api/auctions/', options);
  },

  createCanvas(canvas) {
    return axios.post('/api/canvases/', canvas);
  },
};
