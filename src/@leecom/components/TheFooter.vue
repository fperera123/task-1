<template>
  <footer
    class="the-footer text-center"
    :class="footerClasses"
  >
    <!-- <span class="relative text-center inline-block">
      &copy; Leecom Scada Systems Pvt Ltd.
    </span>
    <span
      class="relative text-center inline-block"
    >Hotline:
      <a
        href="callto:94773055747"
        rel="nofollow"
        class="link"
      >0773055747</a>
    </span>
    <img
      class="leecom-logo inline-block"
      :src="require('@/assets/images/logo/leecom-logo.png')"
    > -->
    <span class="relative text-center inline-block ml-1"> v{{ version }} </span>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
  props: {
    classes: {
      type: String,
    },
  },
  computed: {
    footerClasses() {
      return this.$route.name == "overview" ? "bg-green" : null;
    },
    version() {
      return this.$store.state.app.appVersion;
    },
  },
};
</script>

<style scoped>
.the-footer {
  font-size: 12px;
}

.bg-green {
  color: #2d373e;
  /* background: #d5fff3; */
}
</style>
