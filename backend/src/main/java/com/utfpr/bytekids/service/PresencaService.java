package com.utfpr.bytekids.service;

import com.utfpr.bytekids.dto.PresencaDTO;
import com.utfpr.bytekids.model.Aluno;
import com.utfpr.bytekids.model.Presenca;
import com.utfpr.bytekids.model.Workshop;
import com.utfpr.bytekids.repository.AlunoRepository;
import com.utfpr.bytekids.repository.PresencaRepository;
import com.utfpr.bytekids.repository.WorkshopRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PresencaService {

  private final PresencaRepository presencaRepository;
  private final AlunoRepository alunoRepository;
  private final WorkshopRepository workshopRepository;

  public PresencaService(PresencaRepository presencaRepository, AlunoRepository alunoRepository, WorkshopRepository workshopRepository) {
    this.presencaRepository = presencaRepository;
    this.alunoRepository = alunoRepository;
    this.workshopRepository = workshopRepository;
  }

  public void registrarPresenca(PresencaDTO presencaDTO) {
    Aluno aluno = alunoRepository.findById(presencaDTO.getAlunoId())
        .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));
    Workshop workshop = workshopRepository.findById(presencaDTO.getWorkshopId())
        .orElseThrow(() -> new RuntimeException("Workshop não encontrado"));

    Presenca presenca = new Presenca();
    presenca.setAluno(aluno);
    presenca.setWorkshop(workshop);
    presenca.setData(LocalDate.from(LocalDateTime.now()));
    presenca.setStatus(presencaDTO.getStatus());

    presencaRepository.save(presenca);
  }

  public int getFrequenciaAluno(Long alunoId, Long workshopId) {
    return presencaRepository.countByAlunoAndWorkshop(alunoId, workshopId);
  }

  public String gerarCertificadoHtml(Long alunoId, Long workshopId) {
    var aluno = alunoRepository.findById(alunoId).orElseThrow(() -> new RuntimeException("Aluno não encontrado"));
    var workshop = workshopRepository.findById(workshopId).orElseThrow(() -> new RuntimeException("Workshop não encontrado"));

    return """
                <html>
                <head>
                    <title>Certificado de Conclusão</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; margin: 50px; }
                        .certificado { border: 5px solid black; padding: 30px; display: inline-block; }
                        h1 { color: darkblue; }
                    </style>
                </head>
                <body>
                    <div class='certificado'>
                        <h1>Certificado de Conclusão</h1>
                        <p>Certificamos que <strong>""" + aluno.getNome() + """
        </strong> concluiu com êxito o workshop <strong>""" + workshop.getNome() + """
                        </strong>.</p>
                        <p>Data:\040""" + java.time.LocalDate.now() + """
                        </p>
                        <p>Assinatura: ______________________</p>
                    </div>
                </body>
                </html>
                """;
  }
}
