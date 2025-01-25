<template>
  <sidebar-layout>
    <router-view></router-view>
  </sidebar-layout>
</template>

<script>
import { onUnmounted } from "@vue/composition-api";
import store from "@/store";
import SidebarLayout from "./SidebarLayout.vue";
import ChartStoreModule from "./ChartStoreModule";

export default {
  components: { SidebarLayout },

  setup() {
    const MODULE_NAME = "tanks";

    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, ChartStoreModule);
    }

    onUnmounted(() => {
      if (store.hasModule(MODULE_NAME)) store.unregisterModule(MODULE_NAME);
    });
  },
};
</script>

<style></style>
