<template>
  <div>
    <base-chart class="w-full" ref="chart" :options="chartOptions" :series="series" @mounted="chartMounted" />
    <busy-modal :card="chartCard" />
  </div>
</template>

<script>
import BaseChart from "@leecom/components/highcharts/BaseChart.vue";
import BusyModal from "@leecom/components/busy-modal/BusyModal.vue";

export default {
  components: {
    BaseChart,
    BusyModal,
  },
  props: {
    chartCard: {
      require: true,
      type: Object,
      default: () => {
        return {
          state: null,
          data: null,
          deviceKey: null,
        }
      },
    },
  },
  data() {
    return {
      chart: null,
      key: this.$moment().valueOf(),
    };
  },
  computed: {
    chartData() {
      return this.chartCard.data;
    },
    chartOptions() {
      if (this.chartData) {
        const options = this.$lodash.cloneDeep(this.chartData.chartOptions);
        // options = this.bindLegendItemClick(options);
        return options;
      }
      return {};
    },
    series() {
      if (this.chartData) {
        return this.chartData.series;
      }
      return null;
    },
    dateRange() {
      if (this.chartData) {
        return this.chartData.dateRange;
      }
      return null;
    },
  },
  watch: {
    series() {
      this.updateChartSeries();
    },
  },
  methods: {
    chartMounted() {
      if (this.$refs.chart) {
        this.chart = this.$refs.chart.chart;
        setTimeout(() => {
          this.updateChartSeries();
        }, 400);
        
        console.log("mounted");
      }
    },
    updateChartSeries() {
      if (!this.chart || !this.series) {
        return;
      }

      while (this.chart.series && this.chart.series.length) {
        this.chart.series[0].remove();
      }

      this.series.forEach(data => {
        this.chart.addSeries(data);
      });

      this.$emit("seriesUpdated", this.chart);
      console.log("seriesUpdated");
    },
    bindLegendItemClick(options) {
      options.plotOptions.series.events.legendItemClick = () => {
        // this.toggleYAxis(target);
      };
      return options;
    },
    toggleYAxis(series) {
      setTimeout(() => {
        const { visible } = series;

        this.$lodash.map(this.chart.yAxis, yAxis => {
          if (yAxis.userOptions.id === series.yAxis.userOptions.id) {
            yAxis.update({
              visible,
            });
          }
        });

        const visibleAxis = this.$lodash.filter(this.chart.yAxis, {
          visible: true,
        });

        let count = visibleAxis.length;
        if (count === 0) {
          count = 1;
        }

        let top = 100;

        visibleAxis.forEach(axis => {
          const height = 100 / count;
          top -= height;

          axis.update({
            height: `${height}%`,
            top: `${top}%`,
          });
        });
      }, 10);
    },
  },
}
</script>

<style></style>
