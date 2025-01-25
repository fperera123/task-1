<template>
  <div class="max-w-6xl mx-auto mb-20">
    <tank-levels-table />
    <flow-meter-card />
    <busy-modal :card="busyCard" />
  </div>
</template>

<script>
import FlowMeterCard from "./FlowMeterCard.vue";
import BusyModal from "@/@leecom/components/busy-modal/BusyModal.vue";
import SummaryStoreModule from "./SummaryStoreModule";
import store from "@/store";
import { ref, onUnmounted, computed, watch } from "@vue/composition-api";
import TankLevelsTable from "./TankLevelsTable.vue";

export default {
  components: {
    TankLevelsTable,
    BusyModal,
    FlowMeterCard,
  },
  setup() {
    const MODULE_NAME = "summaryModule";
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, SummaryStoreModule);
    }

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(MODULE_NAME)) store.unregisterModule(MODULE_NAME);
    });

    const busyCard = computed(() => store.state[MODULE_NAME].busyCard);

    return {
      busyCard,
    };
  },
};
</script>

<style></style>
