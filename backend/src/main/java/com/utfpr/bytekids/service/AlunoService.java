package com.utfpr.bytekids.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.utfpr.bytekids.model.Aluno;
import com.utfpr.bytekids.repository.AlunoRepository;

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

    public List<Aluno> listarAlunos() {
        return alunoRepository.findAll();
    }
}

