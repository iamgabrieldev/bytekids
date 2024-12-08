package com.utfpr.bytekids.service;

import com.utfpr.bytekids.model.Professor;
import com.utfpr.bytekids.model.ProfessorLogin;
import com.utfpr.bytekids.repository.ProfessorLoginRepository;
import com.utfpr.bytekids.repository.ProfessorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ProfessorLoginServiceTest {

    @Mock
    private ProfessorRepository professorRepository;

    @Mock
    private ProfessorLoginRepository professorLoginRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private ProfessorLoginService professorLoginService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void cadastrarLogin_DeveriaSalvarLogin_QuandoProfessorExistir() {
        Professor professor = new Professor();
        professor.setId(1L);

        when(professorRepository.findById(1L)).thenReturn(Optional.of(professor));
        when(passwordEncoder.encode("password")).thenReturn("hashedPassword");
        when(professorLoginRepository.save(any(ProfessorLogin.class))).thenReturn(new ProfessorLogin());

        ProfessorLogin result = professorLoginService.cadastrarLogin(1L, "username", "password");

        assertNotNull(result);
        verify(professorRepository, times(1)).findById(1L);
        verify(passwordEncoder, times(1)).encode("password");
        verify(professorLoginRepository, times(1)).save(any(ProfessorLogin.class));
    }

    @Test
    void cadastrarLogin_DeveriaLancarExcecao_QuandoProfessorNaoExistir() {
        when(professorRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            professorLoginService.cadastrarLogin(1L, "username", "password");
        });

        assertEquals("Professor não encontrado!", exception.getMessage());
        verify(professorRepository, times(1)).findById(1L);
        verify(passwordEncoder, never()).encode(anyString());
        verify(professorLoginRepository, never()).save(any(ProfessorLogin.class));
    }

    @Test
    void autenticar_DeveriaRetornarTrue_QuandoCredenciaisForemValidas() {
        ProfessorLogin login = new ProfessorLogin();
        login.setUsername("username");
        login.setPasswordHash("hashedPassword");

        when(professorLoginRepository.findByUsername("username")).thenReturn(login);
        when(passwordEncoder.matches("password", "hashedPassword")).thenReturn(true);

        boolean result = professorLoginService.autenticar("username", "password");

        assertTrue(result);
        verify(professorLoginRepository, times(1)).findByUsername("username");
        verify(passwordEncoder, times(1)).matches("password", "hashedPassword");
    }

    @Test
    void autenticar_DeveriaRetornarFalse_QuandoCredenciaisForemInvalidas() {
        when(professorLoginRepository.findByUsername("username")).thenReturn(null);

        boolean result = professorLoginService.autenticar("username", "password");

        assertFalse(result);
        verify(professorLoginRepository, times(1)).findByUsername("username");
        verify(passwordEncoder, never()).matches(anyString(), anyString());
    }
}