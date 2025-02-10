import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorkshopRequestService } from './workshop-request.service';

describe('WorkshopRequestService', () => {
    let service: WorkshopRequestService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [WorkshopRequestService]
        });

        service = TestBed.inject(WorkshopRequestService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch alunos', () => {
        const dummyAlunos = [{ id: 1, nome: 'Aluno 1' }, { id: 2, nome: 'Aluno 2' }];

        service.getAlunos().subscribe(alunos => {
            expect(alunos.length).toBe(2);
            expect(alunos).toEqual(dummyAlunos);
        });

        const req = httpMock.expectOne(`${service['apiUrl']}/alunos`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyAlunos);
    });

    it('should fetch professores', () => {
        const dummyProfessores = [{ id: 1, nome: 'Professor 1' }, { id: 2, nome: 'Professor 2' }];

        service.getProfessores().subscribe(professores => {
            expect(professores.length).toBe(2);
            expect(professores).toEqual(dummyProfessores);
        });

        const req = httpMock.expectOne(`${service['apiUrl']}/professores`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyProfessores);
    });

    it('should fetch workshops', () => {
        const dummyWorkshops = [{ id: 1, nome: 'Workshop 1' }, { id: 2, nome: 'Workshop 2' }];

        service.getWorkshops().subscribe(workshops => {
            expect(workshops.length).toBe(2);
            expect(workshops).toEqual(dummyWorkshops);
        });

        const req = httpMock.expectOne(`${service['apiUrl']}/workshops`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyWorkshops);
    });

    it('should register presenca', () => {
        const presencaData = { alunoId: 1, workshopId: 1 };
        const response = { success: true };

        service.registerPresenca(presencaData).subscribe(res => {
            expect(res).toEqual(response);
        });

        const req = httpMock.expectOne(`${service['apiUrl']}/presenca/registrar`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({
            alunoId: presencaData.alunoId,
            workshopId: presencaData.workshopId,
            status: "presente"
        });
        req.flush(response);
    });

    it('should edit alunos', () => {
        const alunoData = { id: 1, nome: 'Aluno 1', documento: '12345', workshop: { id: 1 }, telefone: '123456789' };
        const response = { success: true };

        service.editAlunos(alunoData).subscribe(res => {
            expect(res).toEqual(response);
        });

        const req = httpMock.expectOne(`${service['apiUrl']}/alunos/alterar-workshop`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(alunoData);
        req.flush(response);
    });

    it('should fetch frequencia aluno', () => {
        const alunoId = 1;
        const workshopId = 1;
        const frequencia = 5;

        service.getFrequenciaAluno(alunoId, workshopId).subscribe(res => {
            expect(res).toBe(frequencia);
        });

        const req = httpMock.expectOne(`${service['apiUrl']}/presenca/visualizar?alunoId=${alunoId}&workshopId=${workshopId}`);
        expect(req.request.method).toBe('GET');
        req.flush(frequencia);
    });

    it('should register workshop', () => {
        const workshopData = {
            nome: 'Workshop Test',
            turma: 'Turma Test',
            professor: { id: 1, nome: 'Professor Test' },
            alunos: [{ id: 1, nome: 'Aluno Test' }]
        };
        const response = { id: 1 };

        service.registerWorkshop(workshopData).subscribe(res => {
            expect(res).toEqual(response);
        });

        const req = httpMock.expectOne(`${service['apiUrl']}/workshops/cadastrar`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({
            id: 0,
            nome: workshopData.nome,
            turma: workshopData.turma,
            professor: workshopData.professor,
            alunos: workshopData.alunos
        });
        req.flush(response);
    });
});