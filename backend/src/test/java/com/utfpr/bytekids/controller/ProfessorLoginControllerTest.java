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

import static org.mockito.Mockito.when;
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

        when(professorLoginService.cadastrarLogin(1L, "professor1", "senha123"))
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
        when(professorLoginService.autenticar("professor1", "senha123"))
                .thenReturn(true);

        mvc.perform(post("/api/login/autenticar")
                        .param("username", "professor1")
                        .param("password", "senha123")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(status().isOk())
                .andExpect(content().string("Autenticação bem-sucedida!"));
    }

    @Test
    @DisplayName("Deveria devolver código HTTP 400 ao tentar cadastrar login do professor com dados inválidos")
    void cadastrarProfessor_DeveriaRetornar400_QuandoDadosInvalidos() throws Exception {
        mvc.perform(post("/api/login/cadastrar")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    void autenticar_DeveRetornarSucessoQuandoUsuarioESenhaEstiveremCorretos() throws Exception {
        // Dados do teste
        String username = "professorA";
        String password = "senha123";

        // Simulando o comportamento do serviço de autenticação
        when(professorLoginService.autenticar(username, password)).thenReturn(true);

        // Realizando a requisição POST e verificando o status 200 e a mensagem de sucesso
        mvc.perform(post("/api/login/autenticar")
                .param("username", username)
                .param("password", password))
            .andExpect(status().isOk()) // Espera status 200
            .andExpect(content().string("Autenticação bem-sucedida!")); // Mensagem de sucesso
    }

    @Test
    void autenticar_DeveRetornarErroQuandoUsuarioNaoExistir() throws Exception {
        // Dados do teste
        String username = "usuarioInexistente";
        String password = "senha123";

        // Simulando que o serviço de autenticação retorna false, pois o usuário não existe
        when(professorLoginService.autenticar(username, password)).thenReturn(false);

        // Realizando a requisição POST e verificando o status 401 e a mensagem de erro
        mvc.perform(post("/api/login/autenticar")
                .param("username", username)
                .param("password", password))
            .andExpect(status().isUnauthorized()) // Espera status 401
            .andExpect(content().string("Usuário ou senha inválidos.")); // Mensagem de erro
    }

    @Test
    void autenticar_DeveRetornarErroQuandoSenhaEstiverIncorreta() throws Exception {
        // Dados do teste
        String username = "professorA";
        String password = "senhaErrada";

        // Simulando que o serviço de autenticação retorna false, pois a senha está incorreta
        when(professorLoginService.autenticar(username, password)).thenReturn(false);

        // Realizando a requisição POST e verificando o status 401 e a mensagem de erro
        mvc.perform(post("/api/login/autenticar")
                .param("username", username)
                .param("password", password))
            .andExpect(status().isUnauthorized()) // Espera status 401
            .andExpect(content().string("Usuário ou senha inválidos.")); // Mensagem de erro
    }
}
