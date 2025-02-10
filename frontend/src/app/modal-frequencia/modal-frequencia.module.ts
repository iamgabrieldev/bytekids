import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFrequenciaComponent } from '../modal-frequencia/modal-frequencia.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ModalFrequenciaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalFrequenciaComponent
  ]
})
export class ModalFrequenciaModule { }