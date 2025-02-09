import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { WorkshopRequestService } from '../services/requests/workshop-request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-frequencia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-frequencia.component.html',
  styleUrl: './modal-frequencia.component.scss'
})
export class ModalFrequenciaComponent implements OnInit, OnChanges {
  @Input() isVisible: boolean = false;
  @Input() workshop: any = null;
  @Output() close = new EventEmitter<void>();
  frequencia = 0;

  constructor(private workshopService: WorkshopRequestService) {}

  ngOnInit() {
    if (this.workshop) {
      this.getFrequenciaAluno(this.workshop.alunos[0].id, this.workshop.id);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['workshop'] && this.workshop) {
      this.getFrequenciaAluno(this.workshop.alunos[0].id, this.workshop.id);
    }
  }

  getFrequenciaAluno(alunoId: number, workshopId: number) {
    this.workshopService.getFrequenciaAluno(alunoId, workshopId).subscribe({
      next: (frequencia) => {
        this.frequencia = frequencia;
        console.log("oi" + frequencia);
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