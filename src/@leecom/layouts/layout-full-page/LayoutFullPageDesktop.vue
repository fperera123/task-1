<template>
  <div class="flex flex-column">
    <div class="">
      <the-header />
    </div>
    <div class="flex-grow view-port">
      <router-view />
    </div>
    <div class="bottom-0 fixed bg-bgGray w-full">
      <the-footer />
    </div>
  </div>
</template>

<script>
import TheHeader from "@/@leecom/components/TheHeader.vue";
import TheFooter from "@/@leecom/components/TheFooter.vue";

export default {
  components: { TheFooter, TheHeader },
  computed: {},
};
</script>

<style lang="scss" scoped>
.view-port {
  // height: calc(100vh - 200px);
  // overflow: hidden;
}
</style>
