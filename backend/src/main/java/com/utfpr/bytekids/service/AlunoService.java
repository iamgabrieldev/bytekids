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

    public Aluno alterarWorkshop(Aluno aluno) {
        if (aluno.getWorkshop() == null) {
            throw new IllegalArgumentException("Workshop não informado.");
        }
        if (aluno.getId() == null) {
            throw new IllegalArgumentException("Id do aluno não informado.");
        }
        if (aluno.getWorkshop().getId() == null) {
            throw new IllegalArgumentException("Id do workshop não informado.");
        }
        if (!alunoRepository.existsById(aluno.getId())) {
            throw new IllegalArgumentException("Aluno não encontrado.");
        }
        return alunoRepository.save(aluno);
    }

    public void excluirAluno(Long id) {
        if (!alunoRepository.existsById(id)) {
            throw new IllegalArgumentException("Aluno não encontrado.");
        }
        alunoRepository.deleteById(id);
    }

}

