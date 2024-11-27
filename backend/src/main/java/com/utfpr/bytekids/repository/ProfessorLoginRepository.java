package com.utfpr.bytekids.repository;

import com.utfpr.bytekids.model.ProfessorLogin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorLoginRepository extends JpaRepository<ProfessorLogin, Long> {
    ProfessorLogin findByUsername(String username);
}
