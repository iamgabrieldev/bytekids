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
        // Exemplo de validação: verificar se o documento já está cadastrado
        if (professorRepository.existsByDocumento(professor.getDocumento())) {
            throw new IllegalArgumentException("Documento já cadastrado para outro professor.");
        }
        return professorRepository.save(professor);
    }
}
