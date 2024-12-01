package com.utfpr.bytekids.controller;

import com.utfpr.bytekids.model.ProfessorLogin;
import com.utfpr.bytekids.service.ProfessorLoginService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProfessorLoginController.class)
class ProfessorLoginControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private ProfessorLoginService professorLoginService;

    @Test
    @DisplayName("Deveria devolver código HTTP 201 ao cadastrar login com sucesso")
    void cadastrarLogin_DeveriaRetornar200_QuandoCadastroComSucesso() throws Exception {
        ProfessorLogin login = new ProfessorLogin();
        login.setUsername("professor1");
        login.setPasswordHash("hashedPassword"); // senha geralmente é armazenada como hash

        Mockito.when(professorLoginService.cadastrarLogin(1L, "professor1", "senha123"))
                .thenReturn(login);

        mvc.perform(post("/api/login/cadastrar")
                        .param("professorId", "1")
                        .param("username", "professor1")
                        .param("password", "senha123")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("professor1"));
    }

    @Test
    @DisplayName("Deveria devolver código HTTP 200 ao autenticar com sucesso")
    void autenticar_DeveriaRetornar200_QuandoAutenticacaoBemSucedida() throws Exception {
        Mockito.when(professorLoginService.autenticar("professor1", "senha123"))
                .thenReturn(true);

        mvc.perform(post("/api/login/autenticar")
                        .param("username", "professor1")
                        .param("password", "senha123")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(status().isOk())
                .andExpect(content().string("Autenticação bem-sucedida!"));
    }

}
