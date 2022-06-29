import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexDataLabels,
  ApexXAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexPlotOptions,
  ApexYAxis,
  ApexFill,
  ApexMarkers,
  ApexTheme,
  ApexNonAxisChartSeries,
  ApexLegend,
  ApexResponsive,
  ApexStates
} from 'ng-apexcharts';

import { colors } from 'app/colors.const';
import { CoreConfigService } from '@core/services/config.service';

// interface ChartOptions
export interface ChartOptions {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  dataLabels?: ApexDataLabels;
  grid?: ApexGrid;
  stroke?: ApexStroke;
  legend?: ApexLegend;
  title?: ApexTitleSubtitle;
  colors?: string[];
  tooltip?: ApexTooltip;
  plotOptions?: ApexPlotOptions;
  yaxis?: ApexYAxis;
  fill?: ApexFill;
  labels?: string[];
  markers: ApexMarkers;
  theme: ApexTheme;
}

export interface ChartOptions2 {
  // Apex-non-axis-chart-series
  series?: ApexNonAxisChartSeries;
  chart?: ApexChart;
  stroke?: ApexStroke;
  tooltip?: ApexTooltip;
  dataLabels?: ApexDataLabels;
  fill?: ApexFill;
  colors?: string[];
  legend?: ApexLegend;
  labels?: any;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  markers?: ApexMarkers[];
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  states?: ApexStates;
}
@Component({
  selector: 'app-produccion-table',
  templateUrl: './produccion-table.component.html',
  styleUrls: ['./produccion-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProduccionTableComponent implements OnInit {

  mes= 'Abril';
  @ViewChild('apexColumnChartRef') apexColumnChartRef: any;
  @ViewChild('apexBarChartRef') apexBarChartRef: any;


  // public
  public contentHeader: object;
  public apexBarChart: Partial<ChartOptions>;
  public apexColumnChart: Partial<ChartOptions>;
  public isMenuToggled = false;

  public radioModel = 1;

  // ng2-flatpickr options
  public DateRangeOptions = {
    altInput: true,
    mode: 'range',
    altInputClass: 'form-control flat-picker bg-transparent border-0 shadow-none flatpickr-input',
    defaultDate: ['2019-05-01', '2019-05-10'],
    altFormat: 'Y-n-j'
  };

  // Color Variables
  chartColors = {
    column: {
      series1: '#F57F0B',
      series2: '#4ACFF7',
      bg: '#F2F2F2'
    },
    success: {
      shade_100: '#7eefc7',
      shade_200: '#06774f'
    },
    donut: {
      series1: '#ffe700',
      series2: '#00d4bd',
      series3: '#826bf8',
      series4: '#2b9bf4',
      series5: '#FFA1A1'
    },
    area: {
      series3: '#a4f8cd',
      series2: '#60f2ca',
      series1: '#2bdac7'
    }
  };

  // Heatmap data generate
  public generateHeatmapData(count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = 'w' + (i + 1).toString();
      var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(private _coreConfigService: CoreConfigService) {
    
    // Apex Column Chart
    this.apexColumnChart = {
      series: [
        
        {
          name: 'Producción',
          data: [85, 100, 30, 40,]
        }
      ],
      chart: {
        type: 'bar',
        height: 400,
        stacked: true,
        toolbar: {
          show: false
        }
      },
      grid: {
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'left'
      },
      plotOptions: {
        bar: {
          columnWidth: '15%',
          colors: {
            backgroundBarColors: [
              this.chartColors.column.bg,
              this.chartColors.column.bg,
              this.chartColors.column.bg,
              this.chartColors.column.bg,
              this.chartColors.column.bg
            ],
            backgroundBarRadius: 10
          }
        }
      },
      colors: [this.chartColors.column.series1, this.chartColors.column.series2],
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4']
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return '$ ' + val + ' Pesos';
          }
        }
      }
    };

    this.apexBarChart = {
      series: [
        {
          data: [700, 350, 480, 600]
        }
      ],
      chart: {
        height: 400,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '30%',
          endingShape: 'rounded'
        }
      },
      grid: {
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      colors: [colors.solid.info],
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4']
      }
    };

    
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    // content header
    this.contentHeader = {
      headerTitle: 'Apex Charts',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Table',
            isLink: true,
            link: '/'
          },
          {
            name: 'Apex Charts',
            isLink: false
          }
        ]
      }
    };
  }

  /**
   * After View Init
   */
  ngAfterViewInit() {
    // Subscribe to core config changes
    this._coreConfigService.getConfig().subscribe(config => {
      // If Menu Collapsed Changes
      if (config.layout.menu.collapsed === true || config.layout.menu.collapsed === false) {
        setTimeout(() => {
          // Get Dynamic Width for Charts
          this.isMenuToggled = true;
          
          this.apexBarChart.chart.width = this.apexBarChartRef?.nativeElement.offsetWidth;
          this.apexColumnChart.chart.width = this.apexColumnChartRef?.nativeElement.offsetWidth;
        }, 900);
      }
    });
  }
}
