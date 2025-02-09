package com.utfpr.bytekids.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.utfpr.bytekids.model.Aluno;
import com.utfpr.bytekids.service.AlunoService;

@RestController
@RequestMapping("/api/alunos")
public class AlunoController {

  private final AlunoService alunoService;

  public AlunoController(AlunoService alunoService) {
    this.alunoService = alunoService;
  }

  @PostMapping(path = "/cadastrar")
  public ResponseEntity<Aluno> cadastrarAluno(@RequestBody Aluno aluno) {
    Aluno novoAluno = alunoService.salvarAluno(aluno);
    return ResponseEntity.status(HttpStatus.CREATED).body(novoAluno);
  }

  @GetMapping()
  public ResponseEntity<List<Aluno>> listarAlunos() {
    List<Aluno> alunos = alunoService.listarAlunos();
    return ResponseEntity.status(HttpStatus.OK).body(alunos);
  }

  @DeleteMapping(path = "/excluir/{id}")
  public ResponseEntity<?> excluirAluno(@PathVariable Long id) {
    try {
      alunoService.excluirAluno(id);
      return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body("{\"message\": \"" + e.getMessage() + "\"}");
    }
  }

  @PutMapping(path = "/alterar-workshop")
  public ResponseEntity<?> alterarWorkshop(@RequestBody Aluno aluno) {
    try {
      Aluno alunoAlterado = alunoService.alterarWorkshop(aluno);
      return ResponseEntity.status(HttpStatus.OK).body(alunoAlterado);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body("{\"message\": \"" + e.getMessage() + "\"}");
    }
  }
}
