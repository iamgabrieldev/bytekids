package com.utfpr.bytekids.controller;

import com.utfpr.bytekids.dto.PresencaDTO;
import com.utfpr.bytekids.model.Presenca;
import com.utfpr.bytekids.service.PresencaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/presenca")
public class PresencaController {

  private final PresencaService presencaService;

  public PresencaController(PresencaService presencaService) {
    this.presencaService = presencaService;
  }

  @PostMapping("/registrar")
  public ResponseEntity<?> registrarFrequencia(@RequestBody PresencaDTO presencaDTO) {
    presencaService.registrarPresenca(presencaDTO);
    return ResponseEntity.status(201).body("{\"message\": \"Frequência registrada com sucesso!\"}");
  }

  @GetMapping("/visualizar")
  public int getFrequenciaAluno(@RequestParam Long alunoId, @RequestParam Long workshopId) {
    return presencaService.getFrequenciaAluno(alunoId, workshopId);
  }

  @GetMapping("/certificado")
  public String gerarLinkCertificado(@RequestParam Long alunoId, @RequestParam Long workshopId) {
    return "http://localhost:8080/api/presenca/certificado/" + alunoId + "/" + workshopId;
  }

  @GetMapping("/certificado/{alunoId}/{workshopId}")
  public ResponseEntity<String> visualizarCertificado(@PathVariable Long alunoId, @PathVariable Long workshopId) {
    String certificadoHtml = presencaService.gerarCertificadoHtml(alunoId, workshopId);
    return ResponseEntity.ok().body(certificadoHtml);
  }
}
