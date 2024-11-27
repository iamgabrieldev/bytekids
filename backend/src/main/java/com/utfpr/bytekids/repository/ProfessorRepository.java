package com.utfpr.bytekids.repository;

import com.utfpr.bytekids.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    boolean existsByDocumento(String documento);
}
