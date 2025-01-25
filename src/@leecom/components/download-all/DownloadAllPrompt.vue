<template>
  <div>
    <b-dropdown-item
      v-ripple.400="'rgba(30, 30, 30, 0.15)'"
      variant="flat-dark"
      @click="openPrompt"
    >
      Download
    </b-dropdown-item>
    <b-modal
      :key="key"
      centered
      hide-footer
      hide-header
      dialog-class="download-modal-dialog"
      body-class="download-modal-body"
      :visible="visible"
      :no-close-on-backdrop="chartCard.state == 'WAITING'"
      :no-close-on-esc="chartCard.state == 'WAITING'"
      @hidden="hidden"
    >
      <div class="flex flex-column">
        <month-picker class="mx-auto day-picker" @input="dateSelected" />

        <b-button
          v-ripple.400="'rgba(30, 30, 30, 0.15)'"
          variant="flat-dark"
          :disabled="selected == null"
          @click="downloadExcel"
        >
          Start Download
        </b-button>
      </div>
      <busy-modal :card="chartCard" />
    </b-modal>
  </div>
</template>

<script>
import MonthPicker from "../date-picker/MonthPicker.vue";
import { BModal, BButton, BDropdownItem } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import BusyModal from "@/@leecom/components/busy-modal/BusyModal.vue";
import DownloadStoreModule from "./DownloadStoreModule";
import store from "@/store";
import { ref, onUnmounted } from "@vue/composition-api";

export default {
  components: {
    BButton,
    BDropdownItem,
    BModal,
    BusyModal,
    MonthPicker,
  },
  directives: {
    Ripple,
  },

  data() {
    return {
      visible: false,
      dateRange: null,
      selected: null,
      key: this.$moment().valueOf(),

      chartCard: {
        state: null,
      },

      MODULE_NAME: "downloadStoreModule",
    };
  },
  computed: {
    downloadCard() {
      return this.$store.state[this.MODULE_NAME].downloadCard;
    },
  },
  methods: {
    openPrompt() {
      this.visible = true;
      this.key = this.$moment().valueOf();
      this.dateRange = null;
      this.selected = null;
    },
    hidden() {
      this.visible = false;
    },
    downloadExcel() {
      const startTimestamp = this.$moment
        .tz(this.selected.startOf("month").format("YYYY-MM-DD 00:00:00"), "UTC")
        .valueOf();

      const endTimestamp = this.$moment
        .tz(this.selected.endOf("month").format("YYYY-MM-DD 23:59:59"), "UTC")
        .valueOf();

      const payload = {
        type: 'level-and-stock',
        startTimestamp,
        endTimestamp,
        mode: "hour",
        keys: "71zdxqe5rk00",
      };

      console.log(payload);
      this.chartCard.state = "WAITING";

      this.$store
        .dispatch(`${this.MODULE_NAME}/downloadExcel`, payload)
        .then((response) => {
          const fileName = response.headers["file-name"];
          const fileURL = window.URL.createObjectURL(new Blob([response.data]));
          const fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", fileName);
          document.body.appendChild(fileLink);

          fileLink.click();
          this.chartCard.state = null;
          this.visible = false;
        })
        .catch((error) => {
          console.log(error);
          this.chartCard.state = "ERROR";
        });
    },
    rangeSelected($event) {
      this.dateRange = $event;
    },
    dateSelected($event) {
      this.selected = $event;
    },
  },

  setup(props, context) {
    const MODULE_NAME = "downloadStoreModule";

    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, DownloadStoreModule);
    }

    onUnmounted(() => {
      if (store.hasModule(MODULE_NAME)) store.unregisterModule(MODULE_NAME);
    });
  },
};
</script>

<style>
.download-modal-body {
  width: 100%;
  height: 100%;

  padding: 2 rem;
  /* min-height: 400px; */
}

.download-modal-dialog {
  width: 300px;
  max-width: none;
  margin: auto;
}
</style>
