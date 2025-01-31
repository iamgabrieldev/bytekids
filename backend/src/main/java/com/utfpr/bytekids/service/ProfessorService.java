package com.utfpr.bytekids.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.utfpr.bytekids.model.Professor;
import com.utfpr.bytekids.repository.ProfessorRepository;

@Service
public class ProfessorService {

    private final ProfessorRepository professorRepository;

    public ProfessorService(ProfessorRepository professorRepository) {
        this.professorRepository = professorRepository;
    }

    public Professor salvarProfessor(Professor professor) {
        if (professorRepository.existsByDocumento(professor.getDocumento())) {
            throw new IllegalArgumentException("Professor já cadastrado.");
        }
        return professorRepository.save(professor);
    }

    public List<Professor> listarProfessores() {
        return professorRepository.findAll();
    }

}
