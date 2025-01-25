<template>
  <div class="flex justify-end w-full max-w-6xl mx-auto">
    <b-button
      v-if="showSummary"
      v-ripple.400="'rgba(30, 30, 30, 0.15)'"
      variant="flat-dark"
      @click="$router.push('/summary')"
    >
      Summary
    </b-button>
    <!-- <b-button
      v-ripple.400="'rgba(30, 30, 30, 0.15)'"
      variant="flat-dark"
      @click="$router.push('/charts')"
    >
      Charts
    </b-button> -->
    <b-dropdown variant="flat-dark" text="More">
      <!-- <download-all-prompt v-if="!isMobile" /> -->
      <b-dropdown-item variant="flat-dark" @click="logout">
        Logout
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import {
  BButton,
  BDropdown,
  BDropdownItem,
  BDropdownDivider,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import DownloadAllPrompt from "../download-all/DownloadAllPrompt.vue";
import { isMobile } from "mobile-device-detect";

export default {
  components: {
    BButton,
    BDropdown,
    BDropdownItem,
    BDropdownDivider,
    DownloadAllPrompt,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      isMobile,
    };
  },
  methods: {
    logout() {
      window.location.href = "/apps/leave.php";
    },
  },
  computed: {
    showSummary() {
      return this.$route.name !== "summary";
    },
  },
};
</script>
