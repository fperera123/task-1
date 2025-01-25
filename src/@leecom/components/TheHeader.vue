<template>
  <div class="my-1">
    <div class="flex flex-col md:flex-row w-full justify-center items-center">
      <img
        class="header-logo md:order-1"
      />
      <div class="block text-center md:order-2 m-1">
        <h2 class="text-center mb-0">Your Title</h2>
      </div>
    </div>
    <div class="flex flex-col md:flex-col w-full justify-center items-center">
      <h3 class="text-center mb-0">Online fuel stock monitoring system</h3>
      <span
        class="flex flex-row md:flex-row w-full justify-center items-center mt-0.5"
      >
        <h6 class="text-center mb-0">
        </h6>
      </span>
    </div>
    <horizontal-menu />
  </div>
</template>

<script>
import HorizontalMenu from "./horizontal-menu/HorizontalMenu.vue";
export default {
  components: {
    HorizontalMenu,
  },
  computed: {},
};
</script>

<style scoped>
.header-logo {
  width: 60px;
  height: 60px;
}

.btek-logo {
  width: 40px;
}

@media (max-width: 768px) {
  .header-logo {
    width: 60px;
    height: 60px;
  }
}
</style>
