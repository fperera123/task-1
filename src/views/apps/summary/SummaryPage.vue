<template>
  <div class="container mx-auto p-4">

    
    <!-- Loading and Error Messages -->
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    
    <!-- Pond Status Cards -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="(pond, index) in pondStatus.results" 
        :key="pond.deviceKey"
        class="w-full p-1"
      >
        <div class="overflow-x-auto">
          <div class="flex justify-center">
            <div
              class="bg-white shadow rounded-lg mb-2 text-xl text-dark font-bold border-3 device-card p-1 cursor-pointer"
              @click="openChart(pond.deviceKey)"
            >
              <h3 class="text-center mb-0">
                {{ pond.location }}
              </h3>
              <div class="flex flex-row justify-between items-center mt-1">
                <img
  :id="`flow-meter-${pond.deviceKey}`"
  class="fuel-tank-icon"
  :class="pond.deviceKey"
  :src="require('@/assets/images/diagrams/icon.png')"
  alt="Flow Meter Icon"
/>
                <div class="flex flex-col justify-center items-center w-40">
                  <div>Fill Percentage <br> {{ pond.fillPercentage }}%</div>
                </div>
              </div>
              <div class="flex flex-row justify-between items-center mt-1">
                <div class="flex flex-col justify-center items-center">
                  <img
                    class="w-8"
                    :src="appIcons['battery-' + pond.batteryStatus]"
                  />
                  <p class="mb-0">{{ pond.battery }}</p>
                </div>
                <div class="flex flex-col justify-center items-center">
                  <img
                    class="w-8"
                    :src="appIcons['wifi-' + pond.communicationStatus]"
                  />
                  <p class="mb-0">{{ pond.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchPondStatus } from "@/libs/axios"; // Adjust the path as needed
import appIcons from "@/@leecom/app-icons"; // Assuming you need app icons
import InlineSvg from "vue-inline-svg";

export default {
  components: {
    InlineSvg,
  },
  data() {
    return {
      pondStatus: null,
      loading: true,
      error: null,
      appIcons,
    };
  },
  async created() {
    try {
      this.pondStatus = await fetchPondStatus();
    } catch (err) {
      this.error = "Failed to load pond status.";
    } finally {
      this.loading = false;
    }
  },
  methods: {
    getStatusClass(status) {
      switch (status) {
        case "green":
          return "text-green-600 font-bold";
        case "red":
          return "text-red-600 font-bold";
        case "gray":
          return "text-gray-600 font-bold";
        default:
          return "text-black";
      }
    },
    openChart(deviceKey) {
      this.$router.push({
        name: "flow-meters",
        query: { deviceKey },
      });
    },
    svgMounted(event) {
      this.pondStatus.results.forEach((pond) => {
        // Perform any actions you want after SVG is mounted
      });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.device-card {
  border-color: #000000;
  max-width: 300px;
}

.fuel-tank-icon {
  max-height: 78px;
}
</style>
