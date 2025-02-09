import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkshopRequestService } from '../../services/requests/workshop-request.service';
import { AuthenticatorService } from '../../services/authenticator.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-workshop-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './workshop-registration.component.html',
  styleUrl: './workshop-registration.component.scss'
})
export class WorkshopRegistrationComponent {
  workshopForm: FormGroup;
  alunos: any[] = [];
  professores: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private authService: AuthenticatorService,
    private workshopService: WorkshopRequestService,
    private router: Router
  ) {
    this.workshopForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      turma: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      professor: ['', [Validators.required]],
      alunos: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getProfessores();
    this.getAlunos();
  }
  onSubmit() {
    const selectedProfessor = this.workshopForm.value.professor;
    let selectedAlunos = this.workshopForm.value.alunos;
  
    const workshopData = {
      nome: this.workshopForm.value.name,
      turma: this.workshopForm.value.turma,
      alunos: [{
        id: selectedAlunos.id,
        nome: selectedAlunos.nome,
        documento: selectedAlunos.documento,
        telefone: selectedAlunos.telefone,
        workshop: selectedAlunos.workshop
      }],
      professor: {
        id: selectedProfessor.id,
        nome: selectedProfessor.nome,
        documento: selectedProfessor.documento,
        telefone: selectedProfessor.telefone
      }
    };
  
    this.workshopService.registerWorkshop(workshopData).subscribe({
      next: (response: any) => {
        alert('Workshop e login cadastrados com sucesso!');
        selectedAlunos.workshop = {id: response.id};
        this.workshopService.editAlunos(selectedAlunos).subscribe({
          next: (response: any) => {
            console.log(response);
          },
          error: (error: any) => { console.error(error); }
        });
        this.router.navigate(['/student-registration']);             
      },
      error: (err) => {
        if (err.status === 500 && err.error && err.error.message === "Workshop já cadastrado.") {
          alert('Este workshop já está cadastrado.');
        } else {
          alert('Erro ao cadastrar workshop. Tente novamente.');
        }
      },
    });
  }

  get name() {
    return this.workshopForm.get('name');
  }

  get turma() {
    return this.workshopForm.get('turma');
  }

  getAlunos() {
    this.workshopService.getAlunos().subscribe({
      next: (data: any) => {
        this.alunos = data;
        console.log(data);
      },
      error: (error: any) => { console.error(error); }
    });
  }

  getProfessores() {
    this.workshopService.getProfessores().subscribe({
      next: (data: any) => {
        this.professores = data;
        console.log(data);
      },
      error: (error: any) => { console.error(error); }
    });
  }
}