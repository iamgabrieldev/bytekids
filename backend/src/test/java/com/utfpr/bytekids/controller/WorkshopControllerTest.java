package com.utfpr.bytekids.controller;
import com.utfpr.bytekids.model.Professor;
import com.utfpr.bytekids.model.Workshop;
import com.utfpr.bytekids.service.WorkshopService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class WorkshopControllerTest {

  private MockMvc mockMvc;

  @Mock
  private WorkshopService workshopService;

  @InjectMocks
  private WorkshopController workshopController;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    mockMvc = MockMvcBuilders.standaloneSetup(workshopController).build();
  }

  @Test
  void cadastrarWorkshop_DeveCadastrarComSucesso() throws Exception {
    // Simulando um Workshop válido
    Workshop workshop = new Workshop();
    workshop.setTurma("Turma 1");
    workshop.setProfessor(new Professor());

    // Simulando o serviço de salvar o workshop
    when(workshopService.salvarWorkshop(any(Workshop.class))).thenReturn(workshop);

    // Realizando a requisição e verificando o status 201 e o corpo da resposta
    mockMvc.perform(post("/api/workshops/cadastrar")
            .contentType("application/json")
            .content("{\"turma\": \"Turma 1\", \"professor\": {\"id\": 1, \"nome\": \"Professor A\"}}"))
        .andExpect(status().isCreated()) // Espera status 201
        .andExpect(jsonPath("$.turma").value("Turma 1"));
  }

  @Test
  void cadastrarWorkshop_DeveRetornarErroQuandoTurmaJaExistir() throws Exception {
    // Simulando um Workshop com turma já existente
    Workshop workshop = new Workshop();
    workshop.setTurma("Turma 1");
    workshop.setProfessor(new Professor());

    // Simulando que a turma já está cadastrada
    doThrow(new IllegalArgumentException("Turma já cadastrada.")).when(workshopService).salvarWorkshop(any(Workshop.class));

    // Realizando a requisição e verificando o status 400 e a mensagem de erro
    mockMvc.perform(post("/api/workshops/cadastrar")
            .contentType("application/json")
            .content("{\"turma\": \"Turma 1\", \"professor\": {\"id\": 1, \"nome\": \"Professor A\"}}"))
        .andExpect(status().isBadRequest()) // Espera status 400
        .andExpect(content().string("{\"message\": \"Turma já cadastrada.\"}")); // Mensagem de erro
  }

  @Test
  void cadastrarWorkshop_DeveRetornarErroQuandoProfessorNaoExistir() throws Exception {
    // Simulando um Workshop com um professor inexistente
    Workshop workshop = new Workshop();
    workshop.setTurma("Turma 2");
    workshop.setProfessor(new Professor());

    // Simulando que o professor não foi encontrado
    doThrow(new IllegalArgumentException("Professor não encontrado.")).when(workshopService).salvarWorkshop(any(Workshop.class));

    // Realizando a requisição e verificando o status 400 e a mensagem de erro
    mockMvc.perform(post("/api/workshops/cadastrar")
            .contentType("application/json")
            .content("{\"turma\": \"Turma 2\", \"professor\": {\"id\": 1, \"nome\": \"Professor Inexistente\"}}"))
        .andExpect(status().isBadRequest()) // Espera status 400
        .andExpect(content().string("{\"message\": \"Professor não encontrado.\"}")); // Mensagem de erro
  }
}
