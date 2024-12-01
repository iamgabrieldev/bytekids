import com.utfpr.bytekids.model.Professor;
import com.utfpr.bytekids.repository.ProfessorRepository;
import com.utfpr.bytekids.service.ProfessorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ProfessorServiceTest {

    @Mock
    private ProfessorRepository professorRepository;

    @InjectMocks
    private ProfessorService professorService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void salvarProfessor_DeveriaSalvarProfessor_QuandoNaoExistir() {
        Professor professor = new Professor();
        professor.setNome("Maria");
        professor.setDocumento("98765432100");
        professor.setTelefone("169888888888");

        when(professorRepository.existsByDocumento(professor.getDocumento())).thenReturn(false);
        when(professorRepository.save(any(Professor.class))).thenReturn(professor);

        Professor result = professorService.salvarProfessor(professor);

        assertNotNull(result);
        assertEquals("Maria", result.getNome());
        verify(professorRepository, times(1)).existsByDocumento(professor.getDocumento());
        verify(professorRepository, times(1)).save(professor);
    }

    @Test
    void salvarProfessor_DeveriaLancarExcecao_QuandoProfessorJaExistir() {
        Professor professor = new Professor();
        professor.setNome("Maria");
        professor.setDocumento("98765432100");
        professor.setTelefone("169888888888");

        when(professorRepository.existsByDocumento(professor.getDocumento())).thenReturn(true);

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            professorService.salvarProfessor(professor);
        });

        assertEquals("Professor já cadastrado.", exception.getMessage());
        verify(professorRepository, times(1)).existsByDocumento(professor.getDocumento());
        verify(professorRepository, never()).save(any(Professor.class));
    }
}