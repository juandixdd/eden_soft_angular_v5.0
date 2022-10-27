import { Component, OnInit } from "@angular/core";
import { DashboardService } from "app/modules/services/dashboard/dashboard.service";
import { ProductosService } from "app/modules/services/productos/productos.service";

@Component({
  selector: "app-landing-products",
  templateUrl: "./landing-products.component.html",
  styleUrls: ["./landing-products.component.scss"],
})
export class LandingProductsComponent implements OnInit {
  topVentas = [];
  topPedidos = [];
  totalesTop = [];

  constructor(
    private productosService: ProductosService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.getTopVentas();
    this.getTopPedidos();

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
      console.table(this.topVentas);
    });
  }

  getTopPedidos() {
    this.dashboardService.getTopPedidos().subscribe((res: any) => {
      this.topPedidos = res;
      console.table(this.topPedidos);
    });
  }
}
