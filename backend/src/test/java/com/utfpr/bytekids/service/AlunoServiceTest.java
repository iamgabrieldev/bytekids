import com.utfpr.bytekids.model.Aluno;
import com.utfpr.bytekids.repository.AlunoRepository;
import com.utfpr.bytekids.service.AlunoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AlunoServiceTest {

    @Mock
    private AlunoRepository alunoRepository;

    @InjectMocks
    private AlunoService alunoService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void salvarAluno_DeveriaSalvarAluno_QuandoNaoExistir() {
        Aluno aluno = new Aluno();
        aluno.setNome("João");
        aluno.setDocumento("12345678977");
        aluno.setTelefone("169999999999");

        when(alunoRepository.existsByDocumento(aluno.getDocumento())).thenReturn(false);
        when(alunoRepository.save(any(Aluno.class))).thenReturn(aluno);

        Aluno result = alunoService.salvarAluno(aluno);

        assertNotNull(result);
        assertEquals("João", result.getNome());
        verify(alunoRepository, times(1)).existsByDocumento(aluno.getDocumento());
        verify(alunoRepository, times(1)).save(aluno);
    }

    @Test
    void salvarAluno_DeveriaLancarExcecao_QuandoAlunoJaExistir() {
        Aluno aluno = new Aluno();
        aluno.setNome("João");
        aluno.setDocumento("12345678977");
        aluno.setTelefone("169999999999");

        when(alunoRepository.existsByDocumento(aluno.getDocumento())).thenReturn(true);

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            alunoService.salvarAluno(aluno);
        });

        assertEquals("Aluno já cadastrado.", exception.getMessage());
        verify(alunoRepository, times(1)).existsByDocumento(aluno.getDocumento());
        verify(alunoRepository, never()).save(any(Aluno.class));
    }
}