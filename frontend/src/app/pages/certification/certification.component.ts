import { Component } from '@angular/core';
import { CertificationRequestService } from '../../services/requests/certification-request.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-certification',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './certification.component.html',
  styleUrl: './certification.component.scss'
})
export class CertificationComponent {

  alunoId!: number;
  workshopId!: number;
  certificadoLink!: string;
  mensagem!: string;

  constructor(private certificateService: CertificationRequestService) {}

  verificarPresenca(): void {
    this.certificateService.getFrequencia(this.alunoId, this.workshopId).subscribe(frequencia => {
      if (frequencia >= 15) {
        this.gerarCertificado();
      } else {
        this.mensagem = `Frequência insuficiente. Você tem ${frequencia} presença(s).`;
        this.certificadoLink = '';
      }
    }, error => {
      this.mensagem = 'Erro ao verificar a frequência.';
    });
  }

  gerarCertificado(): void {
    this.certificateService.getCertificadoLink(this.alunoId, this.workshopId).subscribe(link => {
      this.certificadoLink = link;
      this.mensagem = 'Certificado gerado com sucesso!';
    }, error => {
      this.mensagem = 'Erro ao gerar o certificado.';
    });
  }
}