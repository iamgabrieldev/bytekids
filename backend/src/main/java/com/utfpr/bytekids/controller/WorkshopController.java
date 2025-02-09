package com.utfpr.bytekids.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.utfpr.bytekids.model.Aluno;
import com.utfpr.bytekids.model.Workshop;
import com.utfpr.bytekids.service.WorkshopService;

@RestController
@RequestMapping("/api/workshops")
public class WorkshopController {

    private final WorkshopService workshopService;

    public WorkshopController(WorkshopService workshopService) {
        this.workshopService = workshopService;
    }

    @PostMapping(path = "/cadastrar")
    public ResponseEntity<?> cadastrarWorkshop(@RequestBody Workshop workshop) {
        try {
            Workshop novoWorkshop = workshopService.salvarWorkshop(workshop);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoWorkshop);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"" + e.getMessage() + "\"}");
        }
    }

    @GetMapping()
    public ResponseEntity<?> listarWorkshops() {
        return ResponseEntity.ok(workshopService.listarWorkshops());
    }

    @DeleteMapping(path="/deletar/{id}")
    public ResponseEntity<?> deletarWorkshop(@PathVariable Long id) {
        try {
            workshopService.deletarWorkshop(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"" + e.getMessage() + "\"}");
        }
    }
}
