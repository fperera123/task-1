<template>
  <div class="h-full w-full flex flex-col">
    <div
      v-if="selectedDevices && selectedDevices.length !== 0"
      class="h-full w-full flex flex-col"
    >
      <chart-action-bar
        v-if="chartCard.data != null"
        class="mb-1"
        :switchable="true"
      />
      <h3 v-if="chartCard.meta" class="text-center text-lg sm:text-2xl m-0">
        {{ chartCard.meta.dateRange }}
      </h3>
      <div
        ref="chartContainer"
        :style="{ height: containerHeight + 'px', width: '100%' }"
        class="flex flex-col md:flex-row w-full chart-container"
      >
        <ChartComponent
          v-if="chartCard.data != null"
          class="w-full h-full"
          :chart-card="chartCard"
        />
      </div>

      <div
        ref="chartContainer"
        :style="{ height: containerHeight + 'px', width: '100%' }"
        class="flex flex-col md:flex-row w-full chart-container"
      >
        <ChartComponent
          v-if="totalizerChartCard.data != null"
          class="w-full h-full"
          :chart-card="totalizerChartCard"
        />
      </div>
    </div>
    <empty v-else />
  </div>
</template>

<script>
import ToggleSwitch from "@/@leecom/components/toggle-switch/ToggleSwitch.vue";
import ChartActionBar from "@/@leecom/components/chart-action-bar/ChartActionBar.vue";
import SelectDevicesSideBar from "@leecom/components/select-devices/SelectDevicesSideBar.vue";
import store from "@/store";
import { ref, onMounted, computed, watch } from "@vue/composition-api";
import { BTabs, BTab, BDropdown, BDropdownItem, BSidebar } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import BusyModal from "@/@leecom/components/busy-modal/BusyModal.vue";
import moment from "moment-timezone";
import ChartComponent from "../ChartComponent.vue";
import Empty from "../../Empty.vue";

export default {
  components: {
    BTabs,
    BTab,
    BDropdown,
    BDropdownItem,
    ChartActionBar,
    BSidebar,
    SelectDevicesSideBar,
    BusyModal,
    ChartComponent,
    ToggleSwitch,
    Empty,
  },
  directives: {
    Ripple,
  },
  setup(props, { root }) {
    const MODULE_NAME = "tanks";

    const busyCard = computed(() => store.state[MODULE_NAME].busyCard);
    const selectedDate = computed(
      () => store.state.chartActionBar.selectedDate,
    );

    const selectedDevices = computed(
      () => store.state.ChartWithSidebarStoreModule.selectedDevices,
    );

    const modeFlowRate = computed(() => {
      if (store.state.chartActionBar.type === "day") {
        return "minute";
      }

      if (store.state.chartActionBar.type === "month") {
        return "hour";
      }
    });

    const modeFlowTotalizer = computed(() => {
      if (store.state.chartActionBar.type === "day") {
        return "hour";
      }

      if (store.state.chartActionBar.type === "month") {
        return "day";
      }
    });

    const type = computed(() => store.state.chartActionBar.type);

    const computeTimeRange = selected => {
      let startTimestamp;
      let endTimestamp;

      // eslint-disable-next-line prefer-const
      startTimestamp = moment
        .tz(
          selected
            .clone()
            .startOf(type.value)
            .format("YYYY-MM-DD 00:00:00"),
          "UTC",
        )
        .valueOf();
      // eslint-disable-next-line prefer-const
      endTimestamp = moment
        .tz(
          selected
            .clone()
            .endOf(type.value)
            .format("YYYY-MM-DD 23:59:59"),
          "UTC",
        )
        .valueOf();

      return { startTimestamp, endTimestamp };
    };

    // 👉 Flow Rate Chart
    const chartCard = ref({
      state: null,
      data: null,
      deviceKey: null,
      meta: null,
    });

    const updateCard = {
      data: (data) => (chartCard.value.data = data),
      state: (state) => (chartCard.value.state = state),
      meta: (meta) => (chartCard.value.meta = meta),
    };

    const fetchChart = () => {
      const { startTimestamp, endTimestamp } = computeTimeRange(
        selectedDate.value,
      );

      console.log("startTimestamp", startTimestamp, "endTimestamp", endTimestamp);

      const deviceKeys = selectedDevices.value
        .map((item) => item.deviceKey)
        .join(",");

      const payload = {
        startTimestamp,
        endTimestamp,
        keys: deviceKeys,
        chart: "flow-rate",
        mode: modeFlowRate.value,
      };
      const ACTION = "fetchChart";

      return new Promise((resolve, reject) => {
        updateCard.state("WAITING");
        store
          .dispatch(`${MODULE_NAME}/${ACTION}`, payload)
          .then((response) => {
            updateCard.data(null);
            updateCard.meta(null);
            let data = response;

            setTimeout(() => {
              updateCard.data(data);
              updateCard.state(null);
              updateCard.meta(response.meta);
              resolve(response);
            }, 100);
          })
          .catch((error) => {
            updateCard.state("ERROR");
            reject(error);
            console.log(error);
          });
      });
    };

    // 👉 Totalizer Chart
    const totalizerChartCard = ref({
      state: null,
      data: null,
      deviceKey: null,
      meta: null,
    });

    const updateTotalizerCard = {
      data: (data) => (totalizerChartCard.value.data = data),
      state: (state) => (totalizerChartCard.value.state = state),
      meta: (meta) => (totalizerChartCard.value.meta = meta),
    };

    const fetchTotalizerChart = () => {
      const { startTimestamp, endTimestamp } = computeTimeRange(
        selectedDate.value,
      );

      const deviceKeys = selectedDevices.value
        .map((item) => item.deviceKey)
        .join(",");

      const payload = {
        startTimestamp,
        endTimestamp,
        keys: deviceKeys,
        chart: "flow-totalizer",
        mode: modeFlowTotalizer.value,
      };
      const ACTION = "fetchChart";

      return new Promise((resolve, reject) => {
        updateTotalizerCard.state("WAITING");
        store
          .dispatch(`${MODULE_NAME}/${ACTION}`, payload)
          .then((response) => {
            updateTotalizerCard.data(null);
            updateTotalizerCard.meta(null);
            let data = response;

            setTimeout(() => {
              updateTotalizerCard.data(data);
              updateTotalizerCard.state(null);
              updateTotalizerCard.meta(response.meta);
              resolve(response);
            }, 100);
          })
          .catch((error) => {
            updateTotalizerCard.state("ERROR");
            reject(error);
            console.log(error);
          });
      });
    };

    const fetchCharts = () => {
      fetchChart();
      fetchTotalizerChart();
    };

    onMounted(() => {
      fetchCharts();
    });

    watch(
      () => [selectedDate.value, selectedDevices.value],
      () => {
        if (selectedDevices.value.length === 0) return;
        fetchCharts();
      },
    );

    const containerHeight = ref(400);
    const chartContainer = ref(null);

    const calculateHeight = () => {
      if (!chartContainer.value) {
        return;
      }
      const width = chartContainer.value.clientWidth;
      const height = chartContainer.value.clientHeight;

      if (width > 600) {
        return;
      }

      if (height <= 0 || width <= 0) {
        return;
      }

      if (height > width) {
        containerHeight.value = width - 150;
      } else {
        containerHeight.value = height;
      }
    };

    onMounted(() => {
      calculateHeight();
      window.addEventListener("resize", calculateHeight);
    });

    watch(
      () => [chartCard.value.data],
      () => {
        calculateHeight();
      },
    );

    return {
      busyCard,
      chartCard,

      selectedDevices,

      chartContainer,
      containerHeight,

      totalizerChartCard,
    };
  },
};
</script>

<style lang="scss" scoped>
.section-tabs {
  height: 38px;
}

.page-content {
  // height: calc(100vh - 50px);
  overflow: auto;
  padding-bottom: 50px;
}

@media (min-width: 768px) {
  .page-content {
    // height: calc(100vh - 240px);
    overflow: auto;
  }
}
</style>

<style lang="scss">
.nav-tabs .nav-link.flat-dark.active {
  color: #000000;
}

.nav-tabs .nav-link.flat-dark::after {
  background: linear-gradient(30deg, #0d0d0d, rgb(40 40 40 / 40%)) !important;
}

.chart-container {
  width: calc(100vw - 300px) !important;
}

.chart-container > div {
  margin-left: 3.5rem !important;
  margin-right: 3.5rem !important;
}

@media (max-width: 1023px) {
  .chart-container {
    width: 100% !important;
  }

  .chart-container > div {
    margin: 0 !important;
  }
}

@media (max-width: 767px) {
  .bottom-bar {
    .section-tabs {
      height: 48px;
    }

    .nav-tabs {
      margin: 0;
      height: 48px;
      justify-content: center;

      .nav-item {
        a {
          height: 100%;
        }
      }
    }
  }
}
</style>
