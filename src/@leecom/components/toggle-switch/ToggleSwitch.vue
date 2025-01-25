<template>
  <label
    :for="label"
    class="flex items-center cursor-pointer gap-x-4 justify-center"
  >
    <span>{{ leftLabel }}</span>
    <div class="relative inline-flex">
      <input
        type="checkbox"
        :id="label"
        class="sr-only"
        v-model="computedValue"
        @change="updateValue"
      >
      <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
      <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
    </div>

    <span>{{ rightLabel }}</span>
  </label>
</template>

<script>
export default {
  name: "ToggleSwitch",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    leftLabel: {
      type: String,
      required: true,
    },
    rightLabel: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      computedValue: this.value,
    };
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.checked);
      this.computedValue = event.target.checked;
    },
  },
};
</script>

<style scoped>
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #48bb78;
}

input:focus ~ .bg-white{
  box-shadow: none;
}
</style>