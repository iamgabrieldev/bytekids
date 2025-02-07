package com.utfpr.bytekids.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

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

import java.util.Arrays;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
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

        when(alunoService.salvarAluno(any(Aluno.class))).thenReturn(alunoSaida);

        mvc.perform(post("/api/alunos/cadastrar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(alunoEntrada)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.nome").value("João"))
                .andExpect(jsonPath("$.documento").value("12345678977"))
                .andExpect(jsonPath("$.telefone").value("169999999999"));
    }

    @Test
    @DisplayName("Deveria devolver código HTTP 400 ao tentar cadastrar aluno com dados inválidos")
    void cadastrarAluno_DeveriaRetornar400_QuandoDadosInvalidos() throws Exception {
        mvc.perform(post("/api/alunos/cadastrar")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Retorna lista de alunos com conteúdo")
    void listarAlunos_DeveRetornarListaDeAlunos() throws Exception {
        // Criação de dois alunos de exemplo
        Aluno aluno1 = new Aluno();
        Aluno aluno2 = new Aluno();

        aluno1.setNome("Aluno 1");
        aluno2.setNome("Aluno 2");

        // Simulando que o serviço retorna esses alunos
        when(alunoService.listarAlunos()).thenReturn(Arrays.asList(aluno1, aluno2));

        // Realizando a requisição GET e verificando o status 200 e os dados dos alunos
        mvc.perform(get("/api/alunos"))
            .andExpect(status().isOk()) // Espera status 200
            .andExpect(jsonPath("$.size()").value(2)) // Espera que a lista tenha 2 alunos
            .andExpect(jsonPath("$[0].nome").value("Aluno 1")) // Verifica o nome do primeiro aluno
            .andExpect(jsonPath("$[1].nome").value("Aluno 2")); // Verifica o nome do segundo aluno
    }

    @Test
    @DisplayName("Retorna lista vazia")
    void listarAlunos_DeveRetornarListaVaziaQuandoNaoExistirAlunos() throws Exception {
        // Simulando que o serviço retorna uma lista vazia
        when(alunoService.listarAlunos()).thenReturn(Collections.emptyList());

        // Realizando a requisição GET e verificando o status 200 e que a lista está vazia
        mvc.perform(get("/api/alunos"))
            .andExpect(status().isOk()) // Espera status 200
            .andExpect(jsonPath("$.size()").value(0)); // Espera que a lista tenha 0 alunos
    }

}
