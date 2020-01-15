import axios from 'axios';

export default {
  // create user account
  authenticate({ provider, accessToken }) {
    switch (provider) {
      case 'google':
        return axios.post('/api/v1/auth/google', { access_token: accessToken });
      default:
        throw Error(`${provider} is not a supported auth provider`);
    }
  },

  userLogOut() {
    return axios.post('api/v1/account/logout')
  },

  getAccountInfo() {
    return axios.get('/api/v1/account');
  },

  getAuctions(options) {
    return axios.get('/api/v1/auctions', options);
  },

  createCanvas(canvas) {
    return axios.post('/api/v1/canvases', canvas);
  },

  getUserCanvases() {
    return axios.get('/api/v1/account/canvases');
  },

  getUserAuctions() {
    return axios.get('/api/v1/account/auctions');
  },
};
