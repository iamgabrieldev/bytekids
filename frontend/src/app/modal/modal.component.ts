import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WorkshopRequestService } from '../services/requests/workshop-request.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() isVisible: boolean = false;
  @Input() workshop: any = null;
  @Output() close = new EventEmitter<void>();

  constructor(private workshopService: WorkshopRequestService) {}


  registerPresenca() {
    const presencaData = {
      alunoId: this.workshop.alunos[0].id,
      workshopId: this.workshop.id
    }
    this.workshopService.registerPresenca(presencaData).subscribe({
      next: (response) => {
        console.log(response);
        alert("Presença registrada com sucesso!");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }
}