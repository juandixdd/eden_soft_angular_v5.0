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
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from "app/modules/services/dashboard/dashboard.service";


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
  selector: 'app-ventas-table',
  templateUrl: './ventas-table.component.html',
  styleUrls: ['./ventas-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VentasTableComponent implements OnInit {
  @ViewChild('apexLineChartRef') apexLineChartRef: any;

  public contentHeader: object;
  public apexLineChart: Partial<ChartOptions>;
  public isMenuToggled = false;
  public radioModel = 1;
  public basicDPdata: NgbDateStruct;
  public basicDPdata2: NgbDateStruct;

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
      series1: '#826af9',
      series2: '#d2b0ff',
      bg: '#f8d3ff'
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

  constructor(
    private _coreConfigService: CoreConfigService,
    private dashboardService: DashboardService

  ) {
    // Apex Line Area Chart
    this.apexLineChart = {
      series: [
        {
          data: [280, 200, 220, 180, 270, 250, 70, 90, 200, 150, 160, 100, 150, 100, 50]
        }
      ],
      chart: {
        height: 400,
        type: 'line',
        zoom: {
          enabled: false
        },
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
      markers: {
        strokeWidth: 7,
        strokeOpacity: 1,
        strokeColors: [colors.solid.white],
        colors: [colors.solid.warning]
      },
      colors: [colors.solid.warning],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      xaxis: {
        categories: [
          '7/12',
          '8/12',
          '9/12',
          '10/12',
          '11/12',
          '12/12',
          '13/12',
          '14/12',
          '15/12',
          '16/12',
          '17/12',
          '18/12',
          '19/12',
          '20/12',
          '21/12'
        ]
      },
      tooltip: {
        custom: function (data) {
          return (
            '<div class="px-1 py-50">' +
            '<span>' +
            data.series[data.seriesIndex][data.dataPointIndex] +
            '%</span>' +
            '</div>'
          );
        }
      }
    };
  }

  ngOnInit(): void {
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
  vPedidos = [];
  vPedidosL=[];
  ventasL=[];
  totalVentas=[];
  arrayVentas=[];
  fechas=[];
  montos=[];

  datePicker() {

    console.log(this.basicDPdata);
    console.log(this.basicDPdata2); 


    let inicio =  this.basicDPdata.year + "-" + this.basicDPdata.month + "-" + this.basicDPdata.day 
    let fin =  this.basicDPdata2.year + "-" + this.basicDPdata2.month + "-" + this.basicDPdata2.day 
    let body = {
      inicio: inicio,
      fin: fin
    }

    this.dashboardService.getVentasPedidos(body).subscribe((res: any) => {
      this.vPedidos = res;
      console.table(this.vPedidos);
    });

    this.dashboardService.getVentasPedidosLocales(body).subscribe((res: any) => {
      this.vPedidosL = res;
      console.table(this.vPedidosL);
    });

    this.dashboardService.getVentas(body).subscribe((res: any) => {
      this.ventasL = res;
      console.table(this.ventasL);
    });
setTimeout(() => {
  
  this.totalVentas = this.totalVentas.concat(this.vPedidos,this.vPedidosL,this.ventasL);
  

  let ventas = this.totalVentas.reduce((acc,valorActual) => {
        let siExiste = acc.find(elemento => elemento.fecha === valorActual.fecha
        );
    
        //si hay objetos
        if (siExiste) {
            return acc.map(elemento => {
                if (elemento.fecha === valorActual.fecha) {
                    return {
                        ...elemento,
                        valor_ventas: elemento.valor_ventas + valorActual.valor_ventas,
                    };
                }
                return elemento
            });
        }
        return [...acc, valorActual];
    }, []);
    ventas.sort((a, b) => a.fecha > b.fecha)
    this.arrayVentas=ventas
    console.table(this.arrayVentas);


}, 100);


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

          this.apexLineChart.chart.width = this.apexLineChartRef?.nativeElement.offsetWidth;

        }, 900);
      }
    });
  }

}
