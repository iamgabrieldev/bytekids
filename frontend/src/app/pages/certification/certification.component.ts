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
    console.log(this.certificationForm.value.aluno);
    console.log(this.certificationForm.value.workshop);
    this.certificateService.getFrequencia(this.certificationForm.value.aluno, this.certificationForm.value.workshop).subscribe(frequencia => {
      if (frequencia >= 15) {
        this.gerarCertificado();
      } else {
        this.mensagem = `Frequência insuficiente. Você tem ${frequencia} presença(s).`;
        this.certificadoLink = '';
      }
    }, error => {
      this.mensagem = 'Erro ao verificar a frequência.';
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