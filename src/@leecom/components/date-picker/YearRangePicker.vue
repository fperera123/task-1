<template>
  <div class="inline-flex gap-2">
    <b-form-select
      v-model="startYear"
      :options="startYearOptions"
      class="min-w-[90px]"
    />
    <div class="self-center">
      to
    </div>
    <b-form-select
      v-model="endYear"
      :options="endYearOptions"
      class="min-w-[90px]"
    />
  </div>
</template>

<script>
import { BFormSelect } from 'bootstrap-vue'

export default {
  components: {
    BFormSelect,
  },
  data() {
    return {
      startYear: null,
      endYear: null,
      minYear: this.$moment('2021'),
      maxStartYear: this.$moment(),
      maxEndYear: this.$moment(),
      startYearOptions: [{ value: null, text: 'Start' }],
      endYearOptions: [{ value: null, text: 'End' }],
    }
  },
  watch: {
    startYear() {
      this.generateEndOptions()
    },
    endYear() {
      this.yearPicked()
    },
  },
  created() {
    this.generateStartOptions()
  },
  methods: {
    generateStartOptions() {
      let difference = this.maxStartYear.diff(this.minYear, 'years')
      let year = this.minYear.format('YYYY') * 1
      while (difference >= 0) {
        this.startYearOptions.push({
          value: year,
          text: year,
        })
        year += 1
        difference--
      }
    },
    generateEndOptions() {
      this.endYearOptions = [{ value: null, text: 'End' }]
      this.endYear = null
      if (this.startYear == null) {
        return
      }
      let difference = this.maxEndYear.diff(
        this.$moment(`${this.startYear}`),
        'years',
      )

      let year = this.startYear * 1
      while (difference >= 0) {
        this.endYearOptions.push({
          value: year,
          text: year,
        })
        year += 1
        difference--
      }
    },
    yearPicked() {
      if (this.startYear == null || this.endYear == null) {
        this.$emit('input', null)
        return
      }

      this.$emit('input', [
        this.$moment(`${this.startYear}`),
        this.$moment(`${this.endYear}`).endOf('year'),
      ])
    },
  },
}
</script>
