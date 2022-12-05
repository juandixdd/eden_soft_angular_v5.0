import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "app/modules/services/dashboard/dashboard.service";

import * as reader from 'xlsx';

@Component({
  selector: "app-landing-products",
  templateUrl: "./landing-products.component.html",
  styleUrls: ["./landing-products.component.scss"],
})
export class LandingProductsComponent implements OnInit {
  topVentas = [];
  topPedidos = [];
  topPedidosLocales = [];
  totalesTop = [];
  top3 = [];
  link:any=document.location.href;
  isDashboard:boolean

  dia = new Date().getDate();
  mes = new Date().getMonth() + 1;
  anio = new Date().getFullYear();
  mesName = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
    new Date()
  );
  fecha = this.anio + "-" + this.mes + "-" + this.dia;
  initialData = {
    mes: this.mes,
    anio: this.anio,
  };

  constructor(
    private dashboardService: DashboardService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getTotalesTop();
    console.warn(this.fecha);
    console.log(this.mesName);
    this.getDataPedidos(this.initialData);
    this.getDataPedidosLocales(this.initialData);
    this.getDataVentas(this.initialData);
   let newLink= this.link.split('/')
    
    console.log('este es el Link jiji',newLink);
    if(newLink.includes('dashboard')){
      this.isDashboard=true;
      
    }else{
      this.isDashboard=false;
      
    }
    
  }

  getMonth(event) {
    let value = event.target.value;
    this.mes = value;

    let body = {
      mes: this.mes,
      anio: this.anio,
    };
    this.getDataPedidos(body);
    this.getDataPedidosLocales(body);
    this.getDataVentas(body);
    this.getTotalesTop();
  }
  getYear(event) {
    let value = event.target.value;
    this.anio = value;

    let body = {
      mes: this.mes,
      anio: this.anio,
    };
    this.getDataPedidos(body);
    this.getDataPedidosLocales(body);
    this.getDataVentas(body);
    this.getTotalesTop();
  }

  getDataPedidos(body) {
    this.dashboardService.getTopPedidosMEs(body).subscribe((res: any) => {
      console.log(res);
      this.topPedidos = res;
    });
  }

  getDataPedidosLocales(body) {
    this.dashboardService
      .getTopPedidosLocalesMEs(body)
      .subscribe((res: any) => {
        console.log(res);
        this.topPedidosLocales = res;
      });
  }
  getDataVentas(body) {
    this.dashboardService.getTopVentasMEs(body).subscribe((res: any) => {
      console.log(res);
      this.topVentas = res;
    });
  }



  getTotalesTop() {
    setTimeout(() => {
      this.totalesTop = [];

      this.totalesTop = this.totalesTop.concat(
        this.topPedidos,
        this.topPedidosLocales,
        this.topVentas
      );

      console.log("Holaaaaa", this.totalesTop);

      console.table(this.totalesTop);

      this.top3 = this.totalesTop.reduce((acc, valorActual) => {
        let siExiste = acc.find(
          (elemento) => elemento.id_producto === valorActual.id_producto
        );

        //si hay objetos
        if (siExiste) {
          return acc.map((elemento) => {
            if (elemento.id_producto === valorActual.id_producto) {
              return {
                ...elemento,
                cantidad_venta:
                  elemento.cantidad_venta + valorActual.cantidad_venta,
              };
            }
            return elemento;
          });
        }
        return [...acc, valorActual];
      }, []);

      this.top3.sort((a, b) => b.cantidad_venta - a.cantidad_venta),
        console.table("Este es el top3: ", this.top3);
    }, 100);
  }

  exportExcel() {
    let date = new Date().getMilliseconds()
    let workBook = reader.utils.book_new()
    const worksheet = reader.utils.json_to_sheet(this.top3)
    reader.utils.book_append_sheet(workBook, worksheet, `informe`)
    let exportFileName = `InformeVentas-${date}.xlsx`
    reader.writeFile(workBook, exportFileName)
  }
}



//------ Logida del top 3 ------

// const ventasLocales = [
//     { id: 1, Nombre: "buñuelo", Ventas: 30 },
//     { id: 2, Nombre: "Empanada", Ventas: 23 },
// ]

// const Pedidos = [
//     { id: 1, Nombre: "buñuelo", Ventas: 32 },
//     { id: 3, Nombre: "Leche", Ventas: 44 },
//     { id: 2, Nombre: "Empanada", Ventas: 50 }
// ]

// const array = ventasLocales.concat(Pedidos);

// let top3 = array.reduce((acc,valorActual) => {
//     let siExiste = acc.find(elemento => elemento.id === valorActual.id
//     );

//     //si hay objetos
//     if (siExiste) {
//         return acc.map(elemento => {
//             if (elemento.id === valorActual.id) {
//                 return {
//                     ...elemento,
//                     Ventas: elemento.Ventas + valorActual.Ventas,
//                 };
//             }
//             return elemento
//         });
//     }
//     return [...acc, valorActual];
// }, []);

// console.log(top3);

