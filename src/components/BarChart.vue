<template>
  <div>
    <highcharts class="hc" :options="chartOptions()" ref="chart"></highcharts>
  </div>
</template>

<script lang="ts">
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";
import {
    ISeriesData
  } from '../interfaces';

NoDataToDisplay(Highcharts);
exportingInit(Highcharts);

@Component
export default class BarChart extends Vue {
  @Prop(String) public userId!: string;
  @Prop() public accountData!: [];
  public seriesData: ISeriesData[] = [];
  public colorPalette = [
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
  ];
  public negIndx: any[] = [];
  public posIndx: any[] = [];
  public payload: any = {};

  @Watch("accountData", { immediate: true, deep: true })
  onValChange(newVal: any) {
    if (this.accountData) {
      this.accountData.forEach((eachAccount: any, index) => {
        let dasd = {
          name: eachAccount.card_type,
          data: [eachAccount.balance],
          color: this.colorPalette[index],
        };
        this.seriesData.push(dasd);
      });
      this.chartOptions();
    }
  }

  mounted() {
    this.$root.$on("mouseOver", (payload: any) => {
      if (payload.id == this.userId) {
        this.payload = payload;
        let allObjs = this.chartOptions().series;
        this.posIndx = allObjs
          .map((v, i) => (v.data[0] < 0 || v.data[0] == 0 ? -1 : i))
          .filter((i) => i + 1);
        this.negIndx = allObjs
          .map((a, i) => (a.data[0] <= 0 ? i : -1))
          .filter((a) => a !== -1);

        if (payload.indx == 1) {
          this.negIndx.forEach(
            (val) => (this.chartOptions().series[val].color = "#6666FF")
          );
          this.posIndx.forEach(
            (val) =>
              (this.chartOptions().series[val].color = this.colorPalette[val])
          );
        } else {
          this.posIndx.forEach(
            (val) => (this.chartOptions().series[val].color = "#99E6E6")
          );
          this.negIndx.forEach(
            (val) =>
              (this.chartOptions().series[val].color = this.colorPalette[val])
          );
        }
      }
    });

    this.$root.$on("mouseOut", (payload: any) => {
      if (
        payload.id == this.userId &&
        this.payload.indx == payload.indx &&
        this.payload.data == payload.data
      ) {
          this.chartOptions().series.forEach((each, index) => each.color = this.colorPalette[index])
      }
    });
  }

  chartOptions() {
    return {
      chart: {
        type: "column",
        width: 500,
        height: 300,
      },
      yAxis: {
        title: {
          text: "Balance",
        },
      },
      lang: {
        noData: "No Data Available",
      },
      title: {
        text: "Account Information",
      },
      series: this.seriesData,
    };
  }
}
</script>
