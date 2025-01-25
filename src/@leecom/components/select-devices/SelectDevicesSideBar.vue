<template>
  <div class="device-sidebar sidebar w-full h-full">
    <div v-for="(section, id) in deviceTree" :key="id" class="section">
      <label class="title">{{ section.title }}</label>
      <ul>
        <li v-for="(item, index) in section.child" :key="index">
          <b-form-checkbox
            v-model="selected"
            :value="item.deviceKey"
            class="custom-control-primary"
            @change="selectionChanged($event, item)"
          >
            {{ item.title }}
          </b-form-checkbox>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { BFormCheckbox } from "bootstrap-vue";
import _ from "lodash";

export default {
  components: {
    BFormCheckbox,
  },
  props: {
    deviceTree: {
      type: Array,
      required: true,
    },
    devices: {
      type: Array,
      required: true,
    },
    singleMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedValues: [],
      selectedDevices: [],
      selectedItems: [],

      selected: [],
    };
  },
  methods: {
    selectionChanged($event, device) {
      this.applyCompareRules($event, device).then(() => {
        this.setSelected();
        this.debounceSelection();
      });
    },
    debounceSelection: _.debounce(function() {
      this.$emit("input", this.selectedValues, this.selectedItems);
    }, 400),
    applyCompareRules(newSelection, device) {
      return new Promise((resolve, reject) => {
        if (this.singleMode) {
          this.selected = [];
          this.selectedItems = [];
          this.selected.push(device.deviceKey);
          this.selectedItems.push(device);
        }
        resolve(true);
      });
    },
    setSelected() {
      this.selectedValues = this.selected;
      const selectedDevices = this.$lodash.filter(
        this.devices,
        (device) => this.selectedValues.includes(device.deviceKey) !== false
      );

      this.selectedDevices = selectedDevices;
      if (!this.singleMode) {
        this.selectedItems = selectedDevices;
      }
    },
  },
  watch: {
    devices: {
      handler(newVal, oldVal) {
        const deviceKey = this.$route.query?.deviceKey;
        
        if (deviceKey) {
          
          // get device matches deviceKey from devices 
          const selectedDevices = this.devices.filter(
            (device) => device.deviceKey === deviceKey
          );

          this.selectionChanged(true, selectedDevices[0]);
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables/_variables.scss";
.sidebar {
  //   background: $white;

  .section {
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    label {
      font-size: 1.3rem;
      font-weight: bold;
    }

    ul > li {
      margin-bottom: 0.5rem;
    }
  }
}
</style>

<style>
.device-sidebar .custom-checkbox .custom-control-label {
  font-size: 1.2rem;
}
</style>
