import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkshopRequestService } from '../services/requests/workshop-request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() workshop: any = null;
  @Output() close = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private workshopService: WorkshopRequestService) {
    this.form = this.fb.group({
      selectedAluno: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.workshop && this.workshop.alunos.length > 0) {
      this.form.patchValue({ selectedAluno: this.workshop.alunos[0] });
    }
  }

  registerPresenca() {
    if (this.form.invalid) {
      alert("Por favor, selecione um aluno.");
      return;
    }

    const presencaData = {
      alunoId: this.form.value.selectedAluno.id,
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