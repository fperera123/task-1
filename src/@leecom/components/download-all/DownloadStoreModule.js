import { ApiPublic, ApiAuth } from "@/libs/axios";
import moment from "moment-timezone";

export default {
  namespaced: true,
  state: {
    downloadCard: {
      deviceKeys: null,
      chartType: null,
    },
  },
  getters: {},
  mutations: {
  },
  actions: {
    downloadExcel({ commit }, payload) {
      const params = {
        keys: payload.keys
      };
      const url = `${ApiPublic.defaults.baseURL}/export/${payload.type}/${payload.mode}/${payload.startTimestamp}/${payload.endTimestamp}`
      ApiPublic.defaults.responseType = 'blob'

      return new Promise((resolve, reject) => {
        ApiPublic.get(url, {
          params,
        })
          .then((response) => {
            delete ApiPublic.defaults.responseType;
            resolve(response)
          })
          .catch(error => {
            delete ApiPublic.defaults.responseType;
            reject(error)
          })
      })
    },
  },
};
