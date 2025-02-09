package com.utfpr.bytekids.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.utfpr.bytekids.model.Workshop;
import com.utfpr.bytekids.repository.ProfessorRepository;
import com.utfpr.bytekids.repository.WorkshopRepository;

@Service
public class WorkshopService {

    private final WorkshopRepository workshopRepository;
    private final ProfessorRepository professorRepository;

    public WorkshopService(WorkshopRepository workshopRepository, ProfessorRepository professorRepository) {
        this.workshopRepository = workshopRepository;
        this.professorRepository = professorRepository;
    }

    public Workshop salvarWorkshop(Workshop workshop) {
        if(workshopRepository.existsByTurma(workshop.getTurma())) {
            throw new IllegalArgumentException("Turma já cadastrada.");
        }

        if (!professorRepository.existsById(workshop.getProfessor().getId())) {
            throw new IllegalArgumentException("Professor não encontrado.");
        }
        return workshopRepository.save(workshop);
    }

    public List<Workshop> listarWorkshops() {
        return workshopRepository.findAll();
    }

    public void deletarWorkshop(Long id) {
        if (!workshopRepository.existsById(id)) {
            throw new IllegalArgumentException("Workshop não encontrado.");
        }
        workshopRepository.deleteById(id);
    }

}
