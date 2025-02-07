package com.utfpr.bytekids.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.utfpr.bytekids.model.Aluno;
import com.utfpr.bytekids.model.Professor;
import com.utfpr.bytekids.service.ProfessorService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProfessorController.class)
class ProfessorControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProfessorService professorService;

    @Test
    @DisplayName("Deveria devolver código HTTP 201 ao cadastrar professor com sucesso")
    void cadastrarProfessor_DeveriaRetornar201_QuandoCadastroComSucesso() throws Exception {
        Professor professorEntrada = new Professor();
        professorEntrada.setNome("Maria");
        professorEntrada.setDocumento("98765432100");
        professorEntrada.setTelefone("119999999999");

        Professor professorSaida = new Professor();
        professorSaida.setId(1L);
        professorSaida.setNome("Maria");
        professorSaida.setDocumento("98765432100");
        professorSaida.setTelefone("119999999999");

        Mockito.when(professorService.salvarProfessor(any(Professor.class))).thenReturn(professorSaida);

        mvc.perform(post("/api/professores/cadastrar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(professorEntrada)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.nome").value("Maria"))
                .andExpect(jsonPath("$.documento").value("98765432100"))
                .andExpect(jsonPath("$.telefone").value("119999999999"));
    }

    @Test
    @DisplayName("Deveria devolver código HTTP 400 ao tentar cadastrar professor com dados inválidos")
    void cadastrarProfessor_DeveriaRetornar400_QuandoDadosInvalidos() throws Exception {
        mvc.perform(post("/api/professores/cadastrar")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Retorna lista de professores com conteúdo")
    void listarAlunos_DeveRetornarListaDeAlunos() throws Exception {
        // Criação de dois professores de exemplo
        Professor professor1 = new Professor();
        Professor professor2 = new Professor();

        professor1.setNome("Professor 1");
        professor2.setNome("Professor 2");

        // Simulando que o serviço retorna esses alunos
        when(professorService.listarProfessores()).thenReturn(Arrays.asList(professor1, professor2));

        // Realizando a requisição GET e verificando o status 200 e os dados dos alunos
        mvc.perform(get("/api/professores"))
            .andExpect(status().isOk()) // Espera status 200
            .andExpect(jsonPath("$.size()").value(2)) // Espera que a lista tenha 2 professores
            .andExpect(jsonPath("$[0].nome").value("Professor 1")) // Verifica o nome do primeiro professor
            .andExpect(jsonPath("$[1].nome").value("Professor 2")); // Verifica o nome do segundo professor
    }

    @Test
    @DisplayName("Retorna lista vazia")
    void listarAlunos_DeveRetornarListaVaziaQuandoNaoExistirAlunos() throws Exception {
        // Simulando que o serviço retorna uma lista vazia
        when(professorService.listarProfessores()).thenReturn(Collections.emptyList());

        // Realizando a requisição GET e verificando o status 200 e que a lista está vazia
        mvc.perform(get("/api/professores"))
            .andExpect(status().isOk()) // Espera status 200
            .andExpect(jsonPath("$.size()").value(0)); // Espera que a lista tenha 0 professor
    }

}
