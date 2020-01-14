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

  getAccountInfo() {
    return axios.get('/api/account/');
  },

  getAuctions(options) {
    return axios.get('/api/auctions/', options);
  },

  createCanvas(canvas) {
    return axios.post('/api/canvases/', canvas);
  },

  getUserCanvases() {
    return axios.get('/api/account/canvases/');
  },

  getUserAuctions() {
    return axios.get('/api/account/auctions/');
  },
};
