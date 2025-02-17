import { Component } from '@angular/core';
import { CertificationRequestService } from '../../services/requests/certification-request.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkshopRequestService } from './../../services/requests/workshop-request.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-certification',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './certification.component.html',
  styleUrl: './certification.component.scss'
})
export class CertificationComponent {

  alunos!: any;
  workshops!: any;
  certificadoLink!: string;
  mensagem!: string;
  certificationForm!: FormGroup;
  workshopsFiltrados!: any;

  constructor(private fb: FormBuilder, private certificateService: CertificationRequestService, private workshopService: WorkshopRequestService) {
    this.certificationForm = this.fb.group({
      aluno: [null, Validators.required],
      workshop: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.getWorkshops();
    this.getAlunos();
  }
  verificarPresenca(): void {
    this.certificateService.getFrequencia(this.certificationForm.value.aluno, this.certificationForm.value.workshop).subscribe(frequencia => {
      if (frequencia > 0) {
        this.gerarCertificado();
      } else {
        this.mensagem = `Aluno ausente.`;
        this.certificadoLink = '';
      }
    }, error => {
      this.mensagem = 'Erro ao gerar certificado.';
      console.log(error);
    });
  }

  gerarCertificado(): void {
    this.certificateService.getCertificadoLink(this.certificationForm.value.aluno, this.certificationForm.value.workshop).subscribe(link => {
      this.certificadoLink = link;
      this.mensagem = 'Certificado gerado com sucesso!';
    }, error => {
      this.mensagem = 'Erro ao gerar o certificado.';
    });
  }

  getWorkshops() {
    this.workshopService.getWorkshops().subscribe(
      (response: any) => {
        this.workshops = response; 
        this.workshopsFiltrados = [];
  
        for (let i = 0; i < this.workshops.length; i++) {
          let workshop = this.workshops[i];
  
          for (let j = 0; j < workshop.alunos.length; j++) {
            if (workshop.alunos[j].id === parseInt(this.certificationForm.value.aluno)) {
              console.log("entrei aqui");
              this.workshopsFiltrados.push(workshop);
            }
          }
        }
      },
      (error: any) => {
        console.error('Erro ao recuperar workshops', error);
      }
    );
  }

  getAlunos() {
    this.workshopService.getAlunos().subscribe(
      (response: any) => {
        this.alunos = response;
      },
      (error: any) => {
        console.error('Erro ao recuperar workshops', error);
      }
    );
  }
}