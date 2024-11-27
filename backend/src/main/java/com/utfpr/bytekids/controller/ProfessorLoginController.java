package com.utfpr.bytekids.controller;

import com.utfpr.bytekids.model.ProfessorLogin;
import com.utfpr.bytekids.service.ProfessorLoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/login")
public class ProfessorLoginController {

    private final ProfessorLoginService professorLoginService;

    public ProfessorLoginController(ProfessorLoginService professorLoginService) {
        this.professorLoginService = professorLoginService;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<ProfessorLogin> cadastrarLogin(
            @RequestParam Long professorId,
            @RequestParam String username,
            @RequestParam String password) {
        ProfessorLogin login = professorLoginService.cadastrarLogin(professorId, username, password);
        return ResponseEntity.ok(login);
    }

    @PostMapping("/autenticar")
    public ResponseEntity<String> autenticar(
            @RequestParam String username,
            @RequestParam String password) {

        boolean autenticado = professorLoginService.autenticar(username, password);
        if (autenticado) {
            return ResponseEntity.ok("Autenticação bem-sucedida!");
        } else {
            return ResponseEntity.status(401).body("Usuário ou senha inválidos.");
        }
    }
}
