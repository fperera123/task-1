<template>
  <div
    v-click-outside="close"
    class="app-month-picker relative"
  >
    <div
      class="w-32 cursor-pointer relative text-black"
      :class="{ 'cursor-not-allowed': disable }"
      @click="open"
    >
      <b-form-input
        :placeholder="this.format"
        class="bg-transparent border-0 !shadow-none w-full z-[2] cursor-pointer text-black"
        :class="{ 'cursor-not-allowed': disable }"
        readonly
        :value="this.selected ? this.selected.format(this.format) : null"
      />
      <feather-icon
        icon="CalendarIcon"
        size="16"
        class="absolute z-0 -left-2 top-3"
      />
    </div>
    <month-picker
      v-if="visible"
      :min-date="minDate"
      :max-date="maxDate"
      :no-default="true"
      class="absolute z-10"
      @input="monthPicked"
    />
  </div>
</template>

<script>
import { MonthPicker } from "vue-month-picker";
import { BFormInput } from "bootstrap-vue";

import Vue from "vue";

export default {
  components: {
    MonthPicker,
    BFormInput,
  },
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
    minDate: {
      type: Date,
      default: () => new Date("2024-08-01 00:00:00"),
    },
    maxDate: {
      type: Date,
      default: () => new Date(),
    },
  },
  data() {
    return {
      visible: false,
      selected: null,
      format: "MM/YYYY",
    };
  },
  created() {
    Vue.directive("click-outside", {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = (event) => {
          if (!(el === event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unbind(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      },
    });
  },
  methods: {
    monthPicked(date) {
      this.visible = false;
      if (date.year == null || date.month == null) {
        return;
      }

      this.selected = this.$moment(date.from).startOf("month");
      this.$emit("input", this.selected);
    },
    open() {
      if (this.disable) {
        this.visible = false;
      } else {
        this.visible = true;
      }
    },
    close() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss">
.app-month-picker .month-picker__container {
  // left: -320px;
  position: absolute !important;
}

.app-month-picker {
  input {
    &.text-black {
      color: #000000 !important;
    }
    &::placeholder {
      color: #000000;
      opacity: 1;
    }

    &:-ms-input-placeholder {
      color: #000000;
    }

    &::-ms-input-placeholder {
      color: #000000;
    }
  }
}
</style>

<style lang="scss">
@import "@/assets/scss/variables/_variables.scss";
.month-picker {
  // font-family: $font-family-sans-serif;

  .month-picker__month {
    border: 0px;
  }

  .month-picker__month:not(.inactive):hover {
    // background: $white;
  }
}

.month-picker__container {
  border-radius: 20px;
  box-shadow: 1px 0 0 #e6e6e6, -1px 0 0 #e6e6e6, 0 1px 0 #e6e6e6,
    0 -1px 0 #e6e6e6, 0 3px 13px rgb(0 0 0 / 8%);
}

.month-picker__year {
  // background-color: $white;
  box-shadow: none;

  button {
    border: none;
    background: none;
    // color: $black;
    font-size: 1.5rem;
    outline: none;
    top: 0rem;
  }

  button:hover {
    background: none;
    // color: $primary;
  }

  p {
    font-weight: normal;
    font-size: 1rem;
    margin: 0.25rem 0;
  }
}
</style>
