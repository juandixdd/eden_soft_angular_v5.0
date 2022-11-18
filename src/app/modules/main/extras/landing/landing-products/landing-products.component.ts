import { Component, OnInit } from "@angular/core";
import { DashboardService } from "app/modules/services/dashboard/dashboard.service";
import { ProductosService } from "app/modules/services/productos/productos.service";
import { table } from "console";

@Component({
  selector: "app-landing-products",
  templateUrl: "./landing-products.component.html",
  styleUrls: ["./landing-products.component.scss"],
})
export class LandingProductsComponent implements OnInit {
  topVentas = [];
  topPedidos = [];
  topPedidosLocales=[];
  totalesTop = [];
  top3=[];

  constructor(
    private productosService: ProductosService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.getTopVentas();
    this.getTopPedidos();
    this.getTopPedidosLocales();
    this.getTotalesTop();

   
  }

  getTopVentas() {
    this.dashboardService.getTopVentas().subscribe((res: any) => {
      this.topVentas = res;
      console.table(this.topVentas);
    });
  }

  getTopPedidos() {
    this.dashboardService.getTopPedidos().subscribe((res: any) => {
      this.topPedidos = res;
      console.table(this.topPedidos);
    });
  }
getTopPedidosLocales(){
  this.dashboardService.getTopPedidosLocales().subscribe((res:any)=>{
    this.topPedidosLocales=res
    console.table(this.topPedidosLocales);
  })
}

getTotalesTop(){
  setTimeout(() => {
    this.totalesTop=this.totalesTop.concat(this.topPedidos,this.topPedidosLocales,this.topVentas);

    console.table(this.totalesTop);

  this.top3 = this.totalesTop.reduce((acc,valorActual) => {
          let siExiste = acc.find(elemento => elemento.producto === valorActual.producto
          );
      
          //si hay objetos
          if (siExiste) {
              return acc.map(elemento => {
                  if (elemento.producto === valorActual.producto) {
                      return {
                          ...elemento,
                          cantidad_ventas: elemento.cantidad_ventas + valorActual.cantidad_ventas,
                      };
                  }
                  return elemento
              });
          }
          return [...acc, valorActual];
      }, []);
      
      console.table(this.top3);

  }, 100);
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