import Vue from "vue";

// axios
import axios from "axios";

// URL for pond status API
const POND_STATUS_URL = "https://www.waternet.lk/apps/watawala/api/summary/pond-status";

// Axios instance for fetching pond status
const ApiPondStatus = axios.create({
  baseURL: POND_STATUS_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Example method to fetch pond status data
const fetchPondStatus = async () => {
  try {
    const response = await ApiPondStatus.get("");
    console.log("Pond Status Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching pond status:", error);
    throw error;
  }
};

// Add it to Vue prototype if needed
Vue.prototype.$pondStatus = fetchPondStatus;

export { fetchPondStatus };
