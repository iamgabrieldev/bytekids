import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { WorkshopRequestService } from '../services/requests/workshop-request.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-frequencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-frequencia.component.html',
  styleUrls: ['./modal-frequencia.component.scss']
})
export class ModalFrequenciaComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() workshop: any = null;
  @Output() close = new EventEmitter<void>();
  frequencia: number = 0;
  form: FormGroup;

  constructor(private fb: FormBuilder, private workshopService: WorkshopRequestService) {
    this.form = this.fb.group({
      selectedAluno: [null, Validators.required]
    });
  }

  ngOnInit() {
    if (this.workshop && this.workshop.alunos && this.workshop.alunos.length > 0) {
      this.getFrequenciaAluno(this.form.value.selectedAluno.id, this.workshop.id);
    }

    this.form.get('selectedAluno')?.valueChanges.subscribe(aluno => {
      if (aluno) {
        this.getFrequenciaAluno(aluno.id, this.workshop.id);
      }
    });
  }

  getFrequenciaAluno(alunoId: number, workshopId: number) {
    this.workshopService.getFrequenciaAluno(alunoId, workshopId).subscribe({
      next: (frequencia) => {
        this.frequencia = frequencia;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  closeModal() {
    this.isVisible = false;
    this.frequencia = 0;
    this.close.emit();
  }
}