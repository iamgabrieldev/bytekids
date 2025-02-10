package com.utfpr.bytekids.service;

import java.util.List;

import com.utfpr.bytekids.model.Workshop;
import com.utfpr.bytekids.repository.WorkshopRepository;
import org.springframework.stereotype.Service;

import com.utfpr.bytekids.model.Aluno;
import com.utfpr.bytekids.repository.AlunoRepository;

@Service
public class AlunoService {

    private final AlunoRepository alunoRepository;
    private final WorkshopRepository workshopRepository;

    public AlunoService(AlunoRepository alunoRepository, WorkshopRepository workshopRepository) {
        this.alunoRepository = alunoRepository;
        this.workshopRepository = workshopRepository;
    }

    public Aluno salvarAluno(Aluno aluno) {
        Workshop workshop = workshopRepository.findById(aluno.getWorkshop().getId())
            .orElseThrow(() -> new RuntimeException("Workshop não encontrado"));

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

