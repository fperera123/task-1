<template>
  <div class="inline-flex gap-2">
    <div class="w-32">
      <month-picker @input="value => (startMonth = value)" />
    </div>
    <div class="self-center mr-2 text-black">
      to
    </div>
    <div class="w-32">
      <month-picker
        :key="endDateKey"
        :disable="disableEnd"
        :min-date="minDate"
        :max-date="maxDate"
        @input="value => (endMonth = value)"
      />
    </div>
  </div>
</template>

<script>
import MonthPicker from "./MonthPicker.vue";

export default {
  components: {
    MonthPicker,
  },
  props: {
    maxRange: {
      required: true,
    },
  },
  data() {
    return {
      startMonth: null,
      endMonth: null,
      disableEnd: true,
      minDate: new Date(),
      maxDate: new Date(),
      endDateKey: this.$moment().valueOf(),
    };
  },
  watch: {
    startMonth() {
      this.enableEnd();
    },
    endMonth() {
      this.datePicked();
    },
  },
  created() {},
  methods: {
    enableEnd() {
      this.endDateKey = this.$moment().valueOf();
      this.endMonth = null;
      if (!this.startMonth) {
        return;
      }
      this.disableEnd = false;

      let maxDate = this.startMonth
        .clone()
        .add(this.maxRange, "month")
        .startOf("month");

      if (maxDate.isAfter(this.$moment())) {
        maxDate = this.$moment().startOf("month");
      }

      this.minDate = new Date(this.startMonth);

      this.maxDate = new Date(maxDate);
    },

    datePicked() {
      if (this.startMonth == null || this.endMonth == null) {
        this.$emit("input", null);
        return;
      }

      this.$emit("input", [
        this.startMonth,
        this.endMonth
          .clone()
          .startOf("month")
          .add(1, "month")
          .subtract(1, "day"),
      ]);
    },
  },
};
</script>
