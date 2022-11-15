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

  constructor(
    private productosService: ProductosService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.getTopVentas();
    this.getTopPedidos();
    this.getTopPedidosLocales()

    setTimeout(() => {
      const buñuelos = this.topPedidos.filter(
        (pedido) => pedido.producto === "Buñuelos"
      );

      console.log(buñuelos);
    }, 100);
  }

  getTopVentas() {
    this.dashboardService.getTopVentas().subscribe((res: any) => {
      this.topVentas = res;
      console.log("VENTAS",this.topVentas);
    });
  }

  getTopPedidos() {
    this.dashboardService.getTopPedidos().subscribe((res: any) => {
      this.topPedidos = res;
      console.log("PEDIDOS",this.topPedidos);
    });
  }
getTopPedidosLocales(){
  this.dashboardService.getTopPedidosLocales().subscribe((res:any)=>{
    this.topPedidosLocales=res
    console.log("PEDIDOSLOCALES",this.topPedidosLocales);
  })
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