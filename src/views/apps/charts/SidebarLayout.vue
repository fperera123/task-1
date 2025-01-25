<template>
  <div class="h-full w-full flex flex-col">
    <div class="flex w-full">
      <b-sidebar
        class="lg:hidden"
        v-model="sidebarOpen"
        bg-variant="light"
        text-variant="dark"
        width="320px"
        shadow
        backdrop
      >
        <select-devices-side-bar
          :key="sideBarKey + 'mobile'"
          :device-tree="deviceTree"
          :single-mode="true"
          :devices="devices"
          @input="selectionChange"
        />
      </b-sidebar>
      <div class="hidden lg:block lg:visible sidebar-desktop h-full">
        <select-devices-side-bar
          :key="sideBarKey + 'desktop'"
          :device-tree="deviceTree"
          :single-mode="true"
          :devices="devices"
          @input="selectionChange"
        />
      </div>
      <div class="w-full pb-32 lg:pb-8">
        <slot></slot>
      </div>
    </div>

    <div
      class="bottom-button fixed z-10 bottom-10 z-2 mx-auto w-full bg-transparent bg-gray-300 lg:hidden flex items-center justify-center"
    >
      <button
        class="bg-blue-500 text-white px-4 py-1 rounded"
        @click="toggleSidebar"
      >
        Devices
      </button>
    </div>
    <busy-modal :card="busyCard" />
  </div>
</template>

<script>
import SelectDevicesSideBar from "@leecom/components/select-devices/SelectDevicesSideBar.vue";
import store from "@/store";
import { ref, onUnmounted, computed, watch } from "@vue/composition-api";
import { inMobileView } from "@/@leecom/utils";
import { BTabs, BTab, BDropdown, BDropdownItem, BSidebar } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import BusyModal from "@/@leecom/components/busy-modal/BusyModal.vue";
import ChartWithSidebarStoreModule from "./ChartWithSidebarStoreModule";
import moment from "moment-timezone";
import router from "@/router";

export default {
  components: {
    BTabs,
    BTab,
    BDropdown,
    BDropdownItem,
    BSidebar,
    SelectDevicesSideBar,
    BusyModal,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      sidebarOpen: false,
      selected: [],
      selectedItems: [],
      sideBarKey: moment().valueOf(),
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    selectionChange(deviceKeys, items) {
      this.selected = deviceKeys;
      this.selectedItems = items;
      this.handleSelection(deviceKeys, items);
    },
  },
  watch: {
    $route: function(route) {
      if (route.path === "/charts") {
        this.selected = [];
        this.selectedItems = [];
        this.sideBarKey = moment().valueOf();
      }
    },
  },
  setup(props, { root }) {
    const MODULE_NAME = "ChartWithSidebarStoreModule";
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, ChartWithSidebarStoreModule);
    }

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(MODULE_NAME)) store.unregisterModule(MODULE_NAME);
    });

    const deviceTree = ref([]);
    const devices = ref([]);

    store
      .dispatch(`${MODULE_NAME}/fetchTree`)
      .then((response) => {
        deviceTree.value = response.deviceTree;
        devices.value = response.devices;
      })
      .catch((error) => {
        console.log(error);
      });

    const busyCard = computed(() => store.state[MODULE_NAME].busyCard);

    const handleSelection = (deviceKeys, devices) => {
      store.dispatch(`${MODULE_NAME}/setSelectedDevices`, devices);

      // get the first device routeName and navigate to it
      if (devices.length > 0) {
        router.push({
          name: devices[0].routeName,
          query: {
            deviceKey: devices[0].deviceKey,
          },
        });
      }
    };


    const selectedDevices = computed(
      () => store.state[MODULE_NAME].selectedDevices
    );

    if (root.$route.query.deviceKey) {
      // console.log(getObjectByDeviceKey(deviceTree.value, root.$route.query.deviceKey))
      // store.dispatch(
      //   `${MODULE_NAME}/setSelectedDevices`,
      //   root.$route.query.deviceKey
      // );
    }

    return {
      deviceTree,
      devices,

      busyCard,

      handleSelection,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar-desktop {
  min-width: 280px;
  max-width: 320px;
  background-color: #f8f8f8;
}
@media (max-width: 384px) {
  .bottom-button {
    bottom: 4rem !important;
  }
}
</style>
