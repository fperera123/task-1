import { ApiPublic, ApiAuth } from "@/libs/axios";
import moment from "moment-timezone";

export default {
  namespaced: true,
  state: {
    busyCard: null,
    selectedDevices: null,
  },
  getters: {},
  mutations: {
    SET_BUSY(state, payload) {
      state.busyCard = payload;
    },
    SET_SELECTED_DEVICES(state, payload) {
      state.selectedDevices = payload;
    },
  },
  actions: {
    fetchTree({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_BUSY", {
          state: "WAITING",
        });
        ApiPublic
          .get("tree/main")
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
      commit("SET_BUSY", payload);
    },
    setSelectedDevices({ commit }, payload) {
      commit("SET_SELECTED_DEVICES", payload);
    },
  },
};
