<template>
  <div class="d-flex align-items-center w-[240px] relative">
    <flat-pickr
      v-if="pickerConfig"
      :key="pickerKey"
      v-model="rangePicker"
      :config="pickerConfig"
      class="form-control flat-picker bg-transparent border-0 shadow-none !w-[240px] z-[1] pl-2 cursor-pointer"
      :placeholder="placeholder"
      @on-change="onSelection"
      @on-close="datePicked"
    />
    <feather-icon
      v-if="pickerConfig"
      icon="CalendarIcon"
      size="16"
      class="absolute z-0 left-0"
    />
    <year-range-picker
      v-if="mode == 'year'"
      @input="datePicked"
    />
    <month-range-picker
      v-if="mode == 'month'"
      :max-range="12"
      @input="datePicked"
    />
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index'
import YearRangePicker from './YearRangePicker.vue'
import MonthRangePicker from './MonthRangePicker'

export default {
  components: {
    flatPickr,
    YearRangePicker,
    MonthRangePicker,
  },
  props: {
    mode: {
      type: String,
      required: true,
    },
    range: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      consumer: null,
      rangeDate: null,
      rangePicker: null,
      pickerConfig: null,
      placeholder: null,
      pickerKey: this.$moment().valueOf(),
    }
  },
  watch: {
    mode() {
      this.modeChanged()
    },
  },
  created() {
    this.modeChanged()
  },
  methods: {
    onSelection(selectedDates, dateStr, instance) {
      let unit = 'days'
      if (this.mode == 'day') {
        unit = 'days'
      }

      if (this.mode == 'month') {
        unit = 'months'
      }

      if (this.mode == 'week') {
        unit = 'weeks'
      }

      if (selectedDates.length == 1) {
        const lastDate = this.$moment(selectedDates[0]).add(
          instance.config.maxRange - 1,
          unit,
        )
        let maxDate = lastDate.format()
        if (this.$moment(instance.config.maxDate).isBefore(lastDate)) {
          maxDate = instance.config.maxDate
        }
        instance.config.minDate = selectedDates[0].toUTCString()
        instance.config.maxDate = maxDate
      } else if (selectedDates.length == 2) {
        instance.config.minDate = new Date('2024-08-01 00:00:00')
        instance.config.maxDate = new Date()
      }
    },
    datePicked(date) {
      if (!date) {
        this.$emit('date-picked', null)
        return
      }
      if (date.length == 1) {
        date.push(date[1])
      }
      let dateRange = {
        startDate: this.$moment(date[0]),
        endDate: this.$moment(date[1]),
      }

      if (this.mode == 'day') {
        dateRange = {
          startDate: this.$moment(date[0]).startOf('day'),
          endDate: this.$moment(date[1]).endOf('day'),
        }
      }

      if (this.mode == 'month') {
        dateRange = {
          startDate: this.$moment(date[0]).startOf('month'),
          endDate: this.$moment(date[1]).endOf('month'),
        }
      }

      if (this.mode == 'year') {
        dateRange = {
          startDate: this.$moment(date[0]).startOf('year'),
          endDate: this.$moment(date[1]).endOf('year'),
        }
      }

      this.$emit('date-picked', dateRange)
    },
    modeChanged() {
      this.pickerConfig = null
      this.pickerKey = this.$moment().valueOf()
      this.rangePicker = null
      if (this.mode === 'day') {
        this.pickerConfig = {
          altInput: true,
          altFormat: 'd/m/Y',
          mode: 'range',
          minDate: new Date('2024-08-01 00:00:00'),
          maxDate: new Date(),
          maxRange: 31,
        }
        this.placeholder = 'DD/MM/YYYY'
      }

      if (this.mode === 'week') {
        this.pickerConfig = {
          altInput: true,
          altFormat: 'd/m/Y',
          mode: 'range',
          minDate: new Date('2024-08-01 00:00:00'),
          maxDate: new Date(),
          maxRange: 6,
          plugins: [
            new monthSelectPlugin({
              shorthand: true,
              dateFormat: 'm/Y',
              altFormat: 'm/Y',
            }),
          ],
        }
        this.placeholder = 'MM/YYYY'
      }

      if (this.mode == 'month' || this.mode == 'year') {
        this.pickerConfig = null
        this.placeholder = null
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
<style>
.flatpickr-monthSelect-months {
  margin: 10px 1px 3px 1px;
  flex-wrap: wrap;
}

.flatpickr-monthSelect-month {
  background: none;
  border: 1px solid transparent;
  border-radius: 22px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #393939;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  margin: 0.5px;
  justify-content: center;
  padding: 10px;
  position: relative;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  text-align: center;
  width: 33%;
}
.flatpickr-monthSelect-theme-dark .flatpickr-monthSelect-month {
  color: rgba(255, 255, 255, 0.95);
}

.flatpickr-monthSelect-month.inRange,
.flatpickr-monthSelect-month.inRange.today,
.flatpickr-monthSelect-month:hover,
.flatpickr-monthSelect-month:focus {
  background: #f6f6f6;
  cursor: pointer;
  outline: 0;
  border-color: #e6e6e6;
}
.flatpickr-monthSelect-theme-dark .flatpickr-monthSelect-month.inRange,
.flatpickr-monthSelect-theme-dark .flatpickr-monthSelect-month:hover,
.flatpickr-monthSelect-theme-dark .flatpickr-monthSelect-month:focus {
  background: #646c8c;
  border-color: #646c8c;
}

/*  .flatpickr-day:hover {
  cursor: pointer;
  background: #e6e6e6;
  border-color: #e6e6e6;
} */

.flatpickr-calendar .flatpickr-disabled {
  color: #dae1e7;
  cursor: not-allowed;
}

.flatpickr-calendar .flatpickr-monthSelect-month.endRange,
.flatpickr-calendar .flatpickr-monthSelect-month.startRange {
  background: #29c76f;
  border-color: #29c76f;
}

.flatpickr-calendar .flatpickr-monthSelect-month.inRange {
  background: #9eebc0;
  border-color: #9eebc0;
}
</style>
