package com.utfpr.bytekids.controller;

import com.utfpr.bytekids.model.Workshop;
import com.utfpr.bytekids.service.WorkshopService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/workshops")
public class WorkshopController {

    private final WorkshopService workshopService;

    public WorkshopController(WorkshopService workshopService) {
        this.workshopService = workshopService;
    }

    @PostMapping(path = "/cadastrar")
    public ResponseEntity<Workshop> cadastrarWorkshop(@RequestBody Workshop workshop) {
        Workshop novoWorkshop = workshopService.salvarWorkshop(workshop);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoWorkshop);
    }
}
