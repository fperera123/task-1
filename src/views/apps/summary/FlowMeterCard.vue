<!-- eslint-disable vue/html-indent -->
<template>
  <div class="w-full p-1">
    <div class="overflow-x-auto">
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
                :id="`flow-meter-${row.deviceKey}`"
                class="fuel-tank-icon"
                :class="row.deviceKey"
                :src="require('@/assets/images/diagrams/flow-meter.svg')"
                @loaded="svgMounted($event)"
              />
              <div class="flex flex-col justify-center items-center w-40">
                <div>Last Hour <br> {{ row.lastHourVolume }} litre</div>
                <div class="text-center">Today <br>{{ row.lastDayVolume }} litre</div>
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
    };
  },
  methods: {
    fetchTableData() {
      this.$store
        .dispatch(`${this.MODULE_NAME}/fetchSummaryTable`, {
          table: "flow-meter",
        })
        .then((response) => {
          this.rows = response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openChart(deviceKey) {
      this.$router.push({
        name: "flow-meters",
        query: {
          deviceKey,
        },
      });
    },
    svgMounted(event) {
      this.rows.forEach((row) => {
      });
    },
  },
  created() {
    this.fetchTableData();
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
