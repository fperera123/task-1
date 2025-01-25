<template>
  <b-overlay
    v-if="card.state !== null"
    :show="true"
    rounded="sm"
    class="position-absolute w-full h-full top-0 left-0 busy-modal-center-vh"
    spinner-variant="primary"
    spinner-type="grow"
    spinner-small
    bg-color="#ffffff"
  >
    <template #overlay>
      <div
        v-if="card.state == 'WAITING'"
        class="text-center"
      >
        <b-spinner variant="primary" />
        <!-- <p></p> -->
      </div>
      <div
        v-if="card.state == 'ERROR'"
        class="text-center"
      >
        <p class="text-dark">
          Unable to fetch data. Please try again.
        </p>
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="outline-primary"
          @click="reloadPage"
        >
          Reload
        </b-button>
      </div>
    </template>
  </b-overlay>
</template>

<script>
import {
  BOverlay, BIcon, BButton, BSpinner,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    BOverlay,
    BIcon,
    BButton,
    BSpinner,
  },
  directives: {
    Ripple,
  },
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>

<style>
.busy-modal-center-vh div > div:last-child {
  /* top: 50vh !important; */
}
</style>
