package com.utfpr.bytekids.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.utfpr.bytekids.model.Professor;
import com.utfpr.bytekids.service.ProfessorService;


@RestController
@RequestMapping("/api/professores")
public class ProfessorController {

    private final ProfessorService professorService;

    public ProfessorController(ProfessorService professorService) {
        this.professorService = professorService;
    }

    @PostMapping(path = "/cadastrar")
    public ResponseEntity<Professor> cadastrarProfessor(@RequestBody Professor professor) {
        Professor novoProfessor = professorService.salvarProfessor(professor);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoProfessor);
    }

    @GetMapping()
    public ResponseEntity<List<Professor>> listarProfessores(){
        List<Professor> professores = professorService.listarProfessores();
        return ResponseEntity.status(HttpStatus.OK).body(professores);
    }
    
}
