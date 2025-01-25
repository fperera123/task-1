<template>
  <div class="h-full">
    <layout-desktop />
  </div>
</template>

<script>
import { isMobile } from "mobile-device-detect";
import LayoutFullPageDesktop from "./LayoutFullPageDesktop.vue";

export default {
  components: { 'layout-desktop': LayoutFullPageDesktop },
  data() {
    return {
      isMobile: isMobile,
    };
  },
};
</script>

<style>
</style>