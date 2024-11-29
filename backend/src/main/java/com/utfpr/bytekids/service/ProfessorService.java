package com.utfpr.bytekids.service;

import com.utfpr.bytekids.model.Professor;
import com.utfpr.bytekids.repository.ProfessorRepository;
import org.springframework.stereotype.Service;

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
}
