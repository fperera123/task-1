<template>
  <highcharts
    ref="chart"
    :constructor-type="'chart'"
    :options="options"
    class="h-100"
  />
</template>

<script>
import { Chart } from "highcharts-vue";
import More from "highcharts/highcharts-more";
import Highcharts from "highcharts";

More(Highcharts);

export default {
  components: {
    highcharts: Chart,
  },
  props: {
    options: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.chart = this.$refs.chart.chart;
    this.$emit("mounted", this.chart);
  },
  methods: {
    afterSetExtremes(event) {
      this.$emit("afterSetExtremes", event);
    },
  },
};
</script>
