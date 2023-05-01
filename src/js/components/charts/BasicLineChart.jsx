import React, { Component } from "react";
import Chart from "react-apexcharts";
import tr from 'apexcharts/dist/locales/tr.json';
import { DashboardContext } from '../../context/DashboardContext';

export default class BasicLineChart extends Component {
  static contextType = DashboardContext;

  constructor(props) {
    super(props);

    // this.state = {
          
    //   series: [{
    //       name: "Desktops",
    //       data: Object.values(this.context.dashboard_charts_info.line)
    //   }],
    //   options: {
    //     chart: {
    //       // height: 350,
    //       type: 'line',
    //       zoom: {
    //         enabled: true
    //       },
    //       locales: [tr],
    //       defaultLocale: 'tr',
    //     },
    //     dataLabels: {
    //       enabled: false
    //     },
    //     stroke: {
    //       curve: 'straight'
    //     },
    //     title: {
    //       text: 'Product Trends by Month',
    //       align: 'left'
    //     },
    //     grid: {
    //       row: {
    //         colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
    //         opacity: 0.5
    //       },
    //     },
    //     xaxis: {
    //       categories: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    //     }
    //   },
    // };
  }

  render() {

    var state = {
          
      series: [{
          name: "Ciro",
          data: Object.values(this.context.dashboard_charts_info.line)
      }],
      options: {
        chart: {
          // height: 350,
          type: 'line',
          zoom: {
            enabled: true
          },
          locales: [tr],
          defaultLocale: 'tr',
          fontFamily: 'Roboto Slab, serif',
          toolbar:{
            tools: {
              download: true,
              selection: true,
              zoom: false,
              zoomin: true,
              zoomout: true,
              pan: false,
              reset: false | '<img src="/static/icons/reset.png" width="20">',
              customIcons: []
            },
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Aylık Ciro Takibi',
          align: 'left',
          style: {
            fontSize:  '16px',
            fontWeight:  'semi-bold',
            color:  '#4B5563'
          },
        },
        theme: {
          mode: 'light', 
          palette: 'palette5', 
          monochrome: {
              enabled: false,
              color: '#8ABCB2',
              shadeTo: 'light',
              shadeIntensity: 0.65
          },

        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.7
          },
        },
        xaxis: {
          categories: Object.keys(this.context.dashboard_charts_info.line),
          labels: {
            show: true,
            rotate: -45,
            rotateAlways: false,
          }
        }
      },
    };

    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart !min-h-0">
            <Chart
              options={state.options}
              series={state.series}
              type="line"
              width="100%"
            />
          </div>
        </div>
      </div>
    );
  }
}