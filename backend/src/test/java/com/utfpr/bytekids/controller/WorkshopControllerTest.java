package com.utfpr.bytekids.controller;
import com.utfpr.bytekids.model.Aluno;
import com.utfpr.bytekids.model.Professor;
import com.utfpr.bytekids.model.Workshop;
import com.utfpr.bytekids.service.WorkshopService;
import org.checkerframework.checker.units.qual.A;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
    List<Aluno> listaAlunos = new ArrayList<>();
    listaAlunos.add(new Aluno());

    // Simulando um Workshop com turma já existente
    Workshop workshop = new Workshop();
    workshop.setTurma("Turma 1");
    workshop.setProfessor(new Professor());
    workshop.setAlunos(listaAlunos);

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

  @Test
  void listarWorkshops_DeveRetornarListaDeWorkshops() throws Exception {
    // Mockando a lista de workshops
    List<Workshop> workshops = Arrays.asList(
        new Workshop(1L, "Turma A"),
        new Workshop(2L, "Turma B")
    );

    when(workshopService.listarWorkshops()).thenReturn(workshops);

    mockMvc.perform(get("/api/workshops"))
        .andExpect(status().isOk()) // Espera status 200
        .andExpect(content().contentType(APPLICATION_JSON))
        .andExpect(content().json("[{\"id\":1,\"turma\":\"Turma A\"},{\"id\":2,\"turma\":\"Turma B\"}]"));
  }

  @Test
  void listarWorkshops_DeveRetornarListaVaziaQuandoNaoHouverWorkshops() throws Exception {
    when(workshopService.listarWorkshops()).thenReturn(Collections.emptyList());

    mockMvc.perform(get("/api/workshops"))
        .andExpect(status().isOk()) // Espera status 200
        .andExpect(content().contentType(APPLICATION_JSON))
        .andExpect(content().json("[]")); // Lista vazia
  }

  @Test
  void deletarWorkshop_DeveRetornarNoContentQuandoSucesso() throws Exception {
    Long workshopId = 1L;

    doNothing().when(workshopService).deletarWorkshop(workshopId);

    mockMvc.perform(delete("/api/workshops/deletar/{id}", workshopId))
        .andExpect(status().isNoContent()); // Espera status 204
  }

  @Test
  void deletarWorkshop_DeveRetornarBadRequestQuandoWorkshopNaoExistir() throws Exception {
    Long workshopId = 99L;

    doThrow(new IllegalArgumentException("Workshop não encontrado."))
        .when(workshopService).deletarWorkshop(workshopId);

    mockMvc.perform(delete("/api/workshops/deletar/{id}", workshopId))
        .andExpect(status().isBadRequest()) // Espera status 400
        .andExpect(content().json("{\"message\": \"Workshop não encontrado.\"}"));
  }
}
