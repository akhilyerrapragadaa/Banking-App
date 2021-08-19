<template>
  <div>
    <highcharts
      class="hc"
      :options="chartOptions()"
      ref="chart"
    ></highcharts>
  </div>
</template>

<script lang="ts">
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";

NoDataToDisplay(Highcharts);
exportingInit(Highcharts);

@Component
export default class PieChart extends Vue {
  @Prop(String) public userId!: string;
  @Prop() public accountData!: [];
  public seriesData: any[] = [];

  @Watch("accountData", { immediate: true, deep: true })
  onValChange(newVal: any) {
    Highcharts.setOptions({ lang: { noData: "Your custom message" } });
    if (this.accountData && this.accountData.length) {
      let lessThan = 0;
      let greatedThan = 0;
      this.accountData.forEach((eachAccount: any) => {
        if (eachAccount.balance >= 0) {
          greatedThan += eachAccount.balance;
        } else {
          lessThan += eachAccount.balance;
        }
      });

      this.seriesData.push({
        name: "Balance >= 0",
        y: greatedThan,
        color: "#99E6E6"
      });
      this.seriesData.push({
        name: "Balance < 0",
        y: Math.abs(lessThan),
        color: "#6666FF"
      });
    } else {
      this.seriesData = [];
    }
    this.chartOptions();
  }


  public chartOptions() {
    return {
      chart: {
        type: "pie",
        width: 500,
        height: 300
      },
      lang: {
        noData: "No Data Available",
      },
      plotOptions: {
        series: {
          point: {
            events: {
              mouseOver:  (event: any) => {
                const globIndx = { indx: event.target.x, data: event.target.y, id: this.userId};
                this.$root.$emit('mouseOver', globIndx)
              },
              mouseOut:  (event: any) => {
               const globIndx = { indx: event.target.x, data: event.target.y, id: this.userId};
               this.$root.$emit('mouseOut', globIndx)
              },
            },
          },
        },
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
        },
      },
      title: {
        text: "Balance Proportion",
      },
      series: [
        {
          name: "Total balance",
          data: this.seriesData,
        },
      ],
    };
  }
}
</script>
