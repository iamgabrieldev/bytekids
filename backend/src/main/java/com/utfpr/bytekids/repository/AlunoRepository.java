package com.utfpr.bytekids.repository;

import com.utfpr.bytekids.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    boolean existsByDocumento(String documento);
}

