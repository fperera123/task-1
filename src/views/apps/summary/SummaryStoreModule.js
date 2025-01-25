import { ApiPublic, ApiAuth } from "@/libs/axios";

export default {
  namespaced: true,
  state: {
    busyCard: {
      state: null,
    },
  },
  getters: {},
  mutations: {
    SET_BUSY(state, payload) {
      state.busyCard = payload;
    },
  },
  actions: {
    fetchSummaryTable({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_BUSY", {
          state: "WAITING",
        });
        ApiPublic
          .get(`summary/${payload.table}`)
          .then(({ data: { results } }) => {
            resolve(results);
            commit("SET_BUSY", {
              state: null,
            });
          })
          .catch(error => {
            commit("SET_BUSY", {
              state: "ERROR",
            });
            reject(error);
          });
      });
    },

    setBusy({ commit }, payload) {
      // commit("SET_BUSY", payload);
    },
  },
};
