package com.utfpr.bytekids.service;

import com.utfpr.bytekids.model.Professor;
import com.utfpr.bytekids.model.ProfessorLogin;
import com.utfpr.bytekids.repository.ProfessorLoginRepository;
import com.utfpr.bytekids.repository.ProfessorRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ProfessorLoginService {

    private final ProfessorRepository professorRepository;
    private final ProfessorLoginRepository professorLoginRepository;
    private final PasswordEncoder passwordEncoder;

    public ProfessorLoginService(ProfessorRepository professorRepository,
                                 ProfessorLoginRepository professorLoginRepository,
                                 PasswordEncoder passwordEncoder) {
        this.professorRepository = professorRepository;
        this.professorLoginRepository = professorLoginRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ProfessorLogin cadastrarLogin(Long professorId, String username, String password) {
        Professor professor = professorRepository.findById(professorId)
                .orElseThrow(() -> new IllegalArgumentException("Professor não encontrado!"));

        String hashedPassword = passwordEncoder.encode(password);

        ProfessorLogin login = new ProfessorLogin();
        login.setProfessor(professor);
        login.setUsername(username);
        login.setPasswordHash(hashedPassword);

        return professorLoginRepository.save(login);
    }

    public boolean autenticar(String username, String password) {
        ProfessorLogin login = professorLoginRepository.findByUsername(username);
        if (login == null) {
            return false;
        }

        return passwordEncoder.matches(password, login.getPasswordHash());
    }
}
