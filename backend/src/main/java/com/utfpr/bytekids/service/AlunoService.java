package com.utfpr.bytekids.service;

import com.utfpr.bytekids.model.Aluno;
import com.utfpr.bytekids.repository.AlunoRepository;
import org.springframework.stereotype.Service;

@Service
public class AlunoService {

    private final AlunoRepository alunoRepository;

    public AlunoService(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    public Aluno salvarAluno(Aluno aluno) {
        if (alunoRepository.existsByDocumento(aluno.getDocumento())) {
            throw new IllegalArgumentException("Aluno já cadastrado.");
        }
        return alunoRepository.save(aluno);
    }
}

