<!-- eslint-disable vue/html-indent -->
<template>
  <div class="w-full p-1">
    <div class="overflow-x-auto">
      <h2 class="text-center">{{ currentTime }}</h2>

      <div class="grid md:grid-cols-2">
        <div
          class="flex justify-center"
          v-for="row in rows"
          :key="row.deviceKey"
        >
          <div
            class="bg-white shadow rounded-lg mb-2 text-xl text-dark font-bold border-3 device-card p-1 cursor-pointer"
            @click="openChart(row.deviceKey)"
          >
            <h3 class="text-center mb-0">
              {{ row.location }}
            </h3>
            <div class="flex flex-row justify-between items-center mt-1">
              <inline-svg
                :id="`fuel-tank-${row.deviceKey}`"
                class="fuel-tank-icon"
                :class="row.deviceKey"
                :src="require('@/assets/images/diagrams/fuel-tank.svg')"
                @loaded="svgMounted($event)"
              />
              <div class="flex flex-col justify-center items-center">
                <div>Level {{ row.level }} cm</div>
                <div class="text-center">Stock {{ row.volume }} litre</div>
              </div>
            </div>
            <div class="flex flex-row justify-between items-center mt-1">
              <div class="flex flex-col justify-center items-center">
                <img
                  class="w-8"
                  :src="appIcons['battery-' + row.batteryStatus]"
                />
                <p class="mb-0">{{ row.battery }}</p>
              </div>
              <div class="flex flex-col justify-center items-center">
                <img
                  class="w-8"
                  :src="appIcons['wifi-' + row.communicationStatus]"
                />
                <p class="mb-0">{{ row.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appIcons from "@/@leecom/app-icons";
import InlineSvg from "vue-inline-svg";

export default {
  components: {
    InlineSvg,
  },
  data() {
    return {
      rows: [],
      MODULE_NAME: "summaryModule",
      key: this.$moment().valueOf(),
      appIcons,
      lastUpdated: "loading...",
      currentTime: "loading..",
    };
  },
  methods: {
    fetchTableData() {
      this.$store
        .dispatch(`${this.MODULE_NAME}/fetchSummaryTable`, {
          table: "tank-level",
        })
        .then((response) => {
          this.rows = response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateTime() {
      this.currentTime = this.$moment().format("HH:mm:ss  DD MMMM YYYY");
    },
    openChart(deviceKey) {
      this.$router.push({
        name: "tanks",
        query: {
          deviceKey,
        },
      });
    },
    updateLevelIndicator(deviceKey, level, maxLevel) {
      const rect = document.querySelector(
        `#fuel-tank-${deviceKey} #level-indicator`
      );
      if (rect) {
        const maxHeight = 115; // Height when level is zero
        const minHeight = 0; // Height when at max level

        const calculatedHeight = maxHeight - (level / maxLevel) * maxHeight;

        // rect.setAttribute("height", calculatedHeight);
        rect.style.height = `${calculatedHeight}px`;
      }
    },
    svgMounted(event) {
      this.rows.forEach((row) => {
        this.updateLevelIndicator(row.deviceKey, row.level, row.maxLevel);
      });
    },
  },
  created() {
    this.fetchTableData();
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  },
};
</script>

<style scoped>
@media (min-width: 767px) {
  .md\:block {
    display: block !important;
    visibility: visible;
  }
}

.device-card {
  border-color: #000000;
  max-width: 300px;
}

.fuel-tank-icon {
  max-height: 78px;
}
</style>
