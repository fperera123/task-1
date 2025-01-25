import { ApiPublic, ApiAuth } from "@/libs/axios";
import moment from "moment-timezone";

export default {
  namespaced: true,
  state: {
    chartCard: {
      state: null,
      data: null,
      deviceKey: null,
    },

    activeTime: "loading...",

    busyCard: null,
  },
  getters: {},
  mutations: {
    UPDATE_CHART(state, payload) {
      state.chartCard.data = payload;
    },
    RESET_CHART(state, payload) {
      state.chartCard.data = payload;
      state.chartCard.deviceKey = null;
      state.chartCard.state = null;
    },
    SET_CHART_STATE(state, payload) {
      state.chartCard.state = payload;
    },
    SET_CHART_DEVICE_KEY(state, payload) {
      state.chartCard.deviceKey = payload;
    },

    SET_ACTIVE_TIME(state, payload) {
      state.activeTime = payload;
    },

    SET_BUSY(state, payload) {
      state.busyCard = payload;
    },
  },
  actions: {
    fetchChart({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("SET_BUSY", {
          state: "WAITING",
        });
        const params = {
          keys: payload.keys
        };
        if (payload.type) {
          params.type = payload.type;
        }
        ApiPublic
          .get(`charts/${payload.chart}/${payload.mode}/${payload.startTimestamp}/${payload.endTimestamp}`,
            {
              params: params,
            })
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

    resetChart({ commit }, payload) {
      commit("RESET_CHART", null);
    },
    setChartDeviceKey({ commit }, payload) {
      commit("SET_CHART_DEVICE_KEY", payload);
    },
    setActiveTime({ commit }, payload) {
      commit("SET_ACTIVE_TIME", payload);
    },
    setBusy({ commit }, payload) {
      commit("SET_BUSY", payload);
    },
  },
};
