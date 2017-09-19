// import axios from 'axios';

// let base = '';

// export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
import server from '../utils/ajax.js'
export default {
  getLogins() {
      return server.get('/logins');
    },
    getBridgeRecords(params) {
      return server.post('/bridge_record', params);
    },
    getClientTraders(params) {
      return server.post('/client_trades', params);
    },
    getPicoTraders(params) {
      return server.post('/pico_trades', params);
    },
    getFunds(params) {
      return server.post('/funds', params);
    },
    getActivity_pico(params) {
      return server.post('/activity/pico', params);
    },
    getActivity_open_orders(params) {
      return server.post('/activity/open_orders', params);
    },
    getSummary_clientTrades(params) {
      return server.post('/summary/pico', params);
    },
    getSummary_picoTrades(params) {
      return server.post('/summary/client', params);
    },
    getSummary_bridgeRecords(params) {
      return server.post('/summary/bridge', params);
    },
    getCurrentMtbase(params) {
      return server.post('/current/mtbase', params);
    }

}