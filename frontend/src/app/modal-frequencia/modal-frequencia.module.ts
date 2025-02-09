import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFrequenciaComponent } from './modal-frequencia.component';

@NgModule({
  declarations: [
    ModalFrequenciaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalFrequenciaComponent // Exporte o ModalComponent
  ]
})
export class ModalFrequenciaModule { }