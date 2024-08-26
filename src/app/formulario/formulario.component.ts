import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EgresoServicio } from '../egreso/egreso.servicio';
import { IngresoServicio } from '../ingreso/ingreso.servicio';
import { Ingreso } from '../ingreso/ingreso.model';
import { Egreso } from '../egreso/egreso.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private ingresoServicio: IngresoServicio,
              private egresoServicio: EgresoServicio) {
    // Inicializa o FormGroup com os controles e valores padrão
    this.form = this.fb.group({
      tipoOperacion: ['ingresoOperacion', Validators.required],
      descripcionInput: [''],
      valorInput: [0, [Validators.required, Validators.min(0)]]
    });
  }

  agregarValor() {
    // Obtém os valores dos controles do formulário
    const { tipoOperacion, descripcionInput, valorInput } = this.form.value;

    if (valorInput <= 0) {
      alert('O valor deve ser um número positivo.');
      return;
    }

    // Adiciona o valor baseado no tipo de operação
    if (tipoOperacion === 'ingresoOperacion') {
      this.ingresoServicio.ingresos.push(
        new Ingreso(descripcionInput, valorInput)
      );
    } else {
      this.egresoServicio.egresos.push(
        new Egreso(descripcionInput, valorInput)
      );
    }

    // Limpa o formulário após a adição
    this.form.reset({ tipoOperacion: 'ingresoOperacion' });
  }
}
