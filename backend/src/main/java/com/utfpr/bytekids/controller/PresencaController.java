package com.utfpr.bytekids.controller;

import com.utfpr.bytekids.dto.PresencaDTO;
import com.utfpr.bytekids.service.PresencaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/presenca")
public class PresencaController {

  private final PresencaService presencaService;

  public PresencaController(PresencaService presencaService) {
    this.presencaService = presencaService;
  }

  @PostMapping("/registrar")
  public ResponseEntity<?> registrarFrequencia(@RequestBody PresencaDTO presencaDTO) {
    try {
      presencaService.registrarPresenca(presencaDTO);
      return ResponseEntity.status(201).body("{\"message\": \"Frequência registrada com sucesso!\"}");
    } catch (RuntimeException e) {
      return ResponseEntity.status(500).body("{\"message\": \"" + e.getMessage() + "\"}");
    }
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
    try {
      String certificadoHtml = presencaService.gerarCertificadoHtml(alunoId, workshopId);
      return ResponseEntity.ok().body(certificadoHtml);
    } catch (RuntimeException e) {
      return ResponseEntity.status(500).body("{\"message\": \"" + e.getMessage() + "\"}");
    }
  }
}
