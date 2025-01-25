import moment from "moment-timezone";

export default {
  namespaced: true,
  state: {
    selectedDate: moment().tz("Asia/Colombo"),
    mode: "minute",
    type: "day",
  },
  getters: {},
  mutations: {
    SET_DATE(state, payload) {
      state.selectedDate = payload;
    },
    SET_MODE(state, payload) {
      state.mode = payload;
    },
    SET_TYPE(state, payload) {
      state.type = payload;
    },
  },
  actions: {
    setDate({ commit }, moment) {
      commit("SET_DATE", moment);
    },
    setMode({ commit }, payload) {
      commit("SET_MODE", payload);
    },
    setType({ commit }, payload) {
      commit("SET_TYPE", payload);
    },
  },
};
