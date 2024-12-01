package com.utfpr.bytekids.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
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

import static org.mockito.ArgumentMatchers.any;
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

}
