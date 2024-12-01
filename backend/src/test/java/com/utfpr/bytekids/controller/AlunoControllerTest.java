package com.utfpr.bytekids.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.utfpr.bytekids.model.Aluno;
import com.utfpr.bytekids.service.AlunoService;
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

@WebMvcTest(AlunoController.class)
class AlunoControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AlunoService alunoService;

    @Test
    @DisplayName("Deveria devolver código HTTP 201 ao cadastrar aluno com sucesso")
    void cadastrarAluno_DeveriaRetornar201_QuandoCadastroComSucesso() throws Exception {
        Aluno alunoEntrada = new Aluno();
        alunoEntrada.setNome("João");
        alunoEntrada.setDocumento("12345678977");
        alunoEntrada.setTelefone("169999999999");

        Aluno alunoSaida = new Aluno();
        alunoSaida.setId(1L);
        alunoSaida.setNome("João");
        alunoSaida.setDocumento("12345678977");
        alunoSaida.setTelefone("169999999999");

        Mockito.when(alunoService.salvarAluno(any(Aluno.class))).thenReturn(alunoSaida);

        mvc.perform(post("/api/alunos/cadastrar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(alunoEntrada)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.nome").value("João"))
                .andExpect(jsonPath("$.documento").value("12345678977"))
                .andExpect(jsonPath("$.telefone").value("169999999999"));
    }

}
