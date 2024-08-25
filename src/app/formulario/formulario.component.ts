import { Component } from '@angular/core';
import { EgresoServicio } from '../egreso/egreso.servicio';
import { IngresoServicio } from '../ingreso/ingreso.servicio';
import { Ingreso } from '../ingreso/ingreso.model';
import { Egreso } from '../egreso/egreso.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  tipo:string="ingresoOperacion";
  descripcionInput:string;
  valorInput:number;

  constructor(private ingresoServicio: IngresoServicio,
    private egresoServicio:EgresoServicio
  ){}

  tipoOperacion(evento: Event){
  //tipoOperacion(evento){
    const target = evento.target as HTMLSelectElement;
    this.tipo = target.value;
    //this.tipo = evento.target.value;
  }

  agregarValor(){
    if(this.tipo == "ingresoOperacion")
      this.ingresoServicio.ingresos.push(
        new Ingreso(this.descripcionInput, this.valorInput));
    else
        this.egresoServicio.egresos.push(
          new Egreso(this.descripcionInput, this.valorInput));
  }
}
