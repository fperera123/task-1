<template>
  <div class="md:w-auto md:inline-flex flex flex-wrap w-full justify-center">
    <b-button
      v-ripple.400="'rgba(30, 30, 30, 0.15)'"
      variant="flat-dark"
      @click="dateBack"
    >
      Back
    </b-button>
    <b-button
      v-ripple.400="'rgba(30, 30, 30, 0.15)'"
      variant="flat-dark"
      class="hideOnMobile"
      @click="dateNow"
    >
      {{ nowText }}
    </b-button>
    <b-button
      v-ripple.400="'rgba(30, 30, 30, 0.15)'"
      variant="flat-dark"
      :disabled="disableFuture()"
      @click="dateNext"
    >
      Next
    </b-button>
    <div class="h-full">
      <b-button
        v-ripple.400="'rgba(30, 30, 30, 0.15)'"
        variant="flat-dark"
        @click="$refs.datePicker.showCalendar()"
      >
        Pick a {{ type }}
      </b-button>
      <datepicker
        ref="datePicker"
        :key="type"
        :input-class="{ hidden: true }"
        wrapper-class="datePickerWrapper"
        :minimum-view="minimumView"
        :maximum-view="'year'"
        :initial-view="initialView"
        :value="date"
        :disabled-dates="disabledDates"
        @selected="datePicked"
      />
    </div>

    <b-button
      v-if="switchable"
      v-ripple.400="'rgba(30, 30, 30, 0.15)'"
      variant="flat-dark"
      @click="switchView"
    >
      {{ switchViewText }}
    </b-button>
    <slot name="more-options" />
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
import Datepicker from "vuejs-datepicker";
import * as APP_CONST from "@/app-constants";
import { isMobile } from "mobile-device-detect";

export default {
  components: {
    BButton,
    BDropdown,
    BDropdownItem,
    BDropdownDivider,
    Datepicker,
  },
  directives: {
    Ripple,
  },
  props: {
    disableTo: {
      type: String,
      default: "2024-12-01",
    },
    switchable: {
      tye: Boolean,
      default: false,
    },
  },
  data() {
    return {
      nowText: "Today",
      isMobile,
      switchViewText: "Switch to Monthly",
    };
  },
  computed: {
    date() {
      return this.$store.state.chartActionBar.selectedDate.clone().toDate();
    },
    minimumView() {
      return this.type;
    },
    maximumView() {
      return this.type;
    },
    initialView() {
      return this.type;
    },
    disabledDates() {
      return {
        to: this.$moment(this.disableTo).toDate(),
        from: this.$moment().toDate(),
      };
    },
    type() {
      if (this.$store.state.chartActionBar.type === "day") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.switchViewText = "Switch to Monthly";
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.nowText = "Today";
      }

      if (this.$store.state.chartActionBar.type === "month") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.switchViewText = "Switch to Daily";
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.nowText = "This Month";
      }

      return this.$store.state.chartActionBar.type;
    },
    mode() {
      return this.$store.state.chartActionBar.mode;
    },
  },
  methods: {
    switchView() {
      if (this.type == "day") {
        this.$store.dispatch("chartActionBar/setType", "month");
      } else {
        this.$store.dispatch("chartActionBar/setType", "day");
      }
      this.dateChanged();
      this.datePicked();
    },
    datePicked(date) {
      this.$store.dispatch("chartActionBar/setDate", this.$moment(date));
      this.dateChanged();
    },
    dateChanged() {
      this.$emit("chartActionBarSelectedDateChanged");
    },
    disableFuture() {
      return this.$moment().isSame(
        this.$store.state.chartActionBar.selectedDate,
        "day"
      );
    },
    dateNow() {
      this.datePicked(this.$moment());
      this.dateChanged();
    },
    dateBack() {
      if (this.type == "day") {
        const date = this.$store.state.chartActionBar.selectedDate.clone();
        this.datePicked(date.subtract(1, "days"));
      }

      if (this.type == "month") {
        const date = this.$store.state.chartActionBar.selectedDate.clone();
        this.datePicked(date.subtract(1, "months"));
      }

      if (this.type == "year") {
        const date = this.$store.state.chartActionBar.selectedDate.clone();
        this.datePicked(date.subtract(1, "years"));
      }
      this.dateChanged();
    },
    dateNext() {
      if (this.type == "day") {
        const date = this.$store.state.chartActionBar.selectedDate.clone();
        let days = 1;
        if (this.mode == APP_CONST.DATE_MODE_WEEK) {
          days = 7;
        }
        this.datePicked(date.add(days, "days"));
      }

      if (this.type == "month") {
        const date = this.$store.state.chartActionBar.selectedDate.clone();
        this.datePicked(date.add(1, "months"));
      }

      if (this.type == "year") {
        const date = this.$store.state.chartActionBar.selectedDate.clone();
        this.datePicked(date.add(1, "years"));
      }
      this.dateChanged();
    },
  },
};
</script>

<style lang="scss" scoped>
.datePickerWrapper {
  position: relative;
  margin-left: -170px;
}

.hiddenOnDesktop {
  display: none;
}

.container {
  text-align: right;
}
@media (max-width: 767px) {
  .container {
    text-align: center;
  }

  .hideOnMobile {
    display: none;
  }

  .hiddenOnDesktop {
    display: inline-block;
  }
}
</style>
