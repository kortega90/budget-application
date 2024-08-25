import { Component, OnInit } from '@angular/core';
import { EgresoServicio } from './egreso/egreso.servicio';
import { IngresoServicio } from './ingreso/ingreso.servicio';
import { Ingreso } from './ingreso/ingreso.model';
import { Egreso } from './egreso/egreso.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ingresos: Ingreso[] = [];
  egresos: Egreso[] = [];

  ingresoTotal: number = 0;
  egresoTotal: number = 0;
  presupuestoTotal: number = 0;

  constructor(
    private ingresoServicio: IngresoServicio,
    private egresoServicio: EgresoServicio
  ) {}

  ngOnInit(): void {
    this.ingresos = this.ingresoServicio.ingresos;
    this.egresos = this.egresoServicio.egresos;

    this.ingresoTotal = this.calcularIngresoTotal();
    this.egresoTotal = this.calcularEgresoTotal();
    this.presupuestoTotal = this.calcularPresupuestoTotal();
  }

  calcularIngresoTotal(): number {
    return this.ingresos.reduce((total, ingreso) => total + ingreso.valor, 0);
  }

  calcularEgresoTotal(): number {
    return this.egresos.reduce((total, egreso) => total + egreso.valor, 0);
  }

  calcularPresupuestoTotal(): number {
    return this.ingresoTotal - this.egresoTotal;
  }

  getPorcentajeTotal(): number {
    return this.ingresoTotal > 0 ? (this.egresoTotal / this.ingresoTotal) * 100 : 0;
  }
}
