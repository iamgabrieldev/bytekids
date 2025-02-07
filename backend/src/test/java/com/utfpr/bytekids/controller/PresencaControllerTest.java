package com.utfpr.bytekids.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.utfpr.bytekids.dto.PresencaDTO;
import com.utfpr.bytekids.service.PresencaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

class PresencaControllerTest {

  private MockMvc mockMvc;

  @Mock
  private PresencaService presencaService;

  @InjectMocks
  private PresencaController presencaController;

  @BeforeEach
  void setUp()  {
    MockitoAnnotations.openMocks(this);
    mockMvc = MockMvcBuilders.standaloneSetup(presencaController).build();
  }

  @Test
  void registrarFrequencia_DeveRegistrarComSucesso() throws Exception {
    PresencaDTO presencaDTO = new PresencaDTO(1L, 1L, "Presente");

    // Simula o comportamento do serviço
    doNothing().when(presencaService).registrarPresenca(presencaDTO);

    // Realiza a requisição e verifica a resposta
    mockMvc.perform(MockMvcRequestBuilders.post("/api/presenca/registrar")
            .contentType("application/json")
            .content("{\"alunoId\": 1, \"workshopId\": 1, \"status\": \"Presente\"}"))
        .andExpect(status().isCreated())
        .andExpect(content().string("{\"message\": \"Frequência registrada com sucesso!\"}"));
  }

  @Test
  void registrarFrequencia_DeveRetornarErroQuandoAlunoNaoExistir() throws Exception {
    PresencaDTO presencaDTO = new PresencaDTO(1L, 1L, "Presente");

    // Simula a exceção no serviço quando o aluno não for encontrado
    doThrow(new RuntimeException("Aluno não encontrado")).when(presencaService).registrarPresenca(any());

    // Realiza a requisição e verifica se o status 500 e a mensagem de erro estão corretos
    mockMvc.perform(MockMvcRequestBuilders.post("/api/presenca/registrar")
            .contentType("application/json")
            .content("{\"alunoId\": 1, \"workshopId\": 1, \"status\": \"Presente\"}"))
        .andExpect(status().isInternalServerError())  // Verifica se o status é 500
        .andExpect(content().string("{\"message\": \"Aluno não encontrado\"}"));  // Verifica a mensagem de erro
  }

  @Test
  void getFrequenciaAluno_DeveRetornarFrequencia() throws Exception {
    when(presencaService.getFrequenciaAluno(1L, 1L)).thenReturn(5);

    mockMvc.perform(MockMvcRequestBuilders.get("/api/presenca/visualizar")
            .param("alunoId", "1")
            .param("workshopId", "1"))
        .andExpect(status().isOk())
        .andExpect(content().string("5"));
  }

  @Test
  void gerarLinkCertificado_DeveGerarLinkCertificado() throws Exception {
    mockMvc.perform(MockMvcRequestBuilders.get("/api/presenca/certificado")
            .param("alunoId", "1")
            .param("workshopId", "1"))
        .andExpect(status().isOk())
        .andExpect(content().string("http://localhost:8080/api/presenca/certificado/1/1"));
  }

  @Test
  void visualizarCertificado_DeveRetornarCertificadoHtml() throws Exception {
    String certificadoHtml = "<html><body><h1>Certificado de Conclusão</h1></body></html>";
    when(presencaService.gerarCertificadoHtml(1L, 1L)).thenReturn(certificadoHtml);

    mockMvc.perform(MockMvcRequestBuilders.get("/api/presenca/certificado/{alunoId}/{workshopId}", 1, 1))
        .andExpect(status().isOk())
        .andExpect(content().string(certificadoHtml));
  }

  @Test
  void visualizarCertificado_DeveRetornarErroQuandoAlunoNaoExistir() throws Exception {
    when(presencaService.gerarCertificadoHtml(1L, 1L)).thenThrow(new RuntimeException("Aluno não encontrado"));

    mockMvc.perform(MockMvcRequestBuilders.get("/api/presenca/certificado/{alunoId}/{workshopId}", 1, 1))
        .andExpect(status().isInternalServerError())
        .andExpect(content().string("{\"message\": \"Aluno não encontrado\"}"));
  }

  @Test
  void visualizarCertificado_DeveRetornarErroQuandoWorkshopNaoExistir() throws Exception {
    when(presencaService.gerarCertificadoHtml(1L, 1L)).thenThrow(new RuntimeException("Workshop não encontrado"));

    mockMvc.perform(MockMvcRequestBuilders.get("/api/presenca/certificado/{alunoId}/{workshopId}", 1, 1))
        .andExpect(status().isInternalServerError())
        .andExpect(content().string("{\"message\": \"Workshop não encontrado\"}"));
  }
}

