<template>
  <layout-full-page>
    <router-view />
  </layout-full-page>
</template>

<script>
import LayoutFullPage from "@/@leecom/layouts/layout-full-page/LayoutFullPage.vue";

export default {
  components: {
    LayoutFullPage,
  },
};
</script>
