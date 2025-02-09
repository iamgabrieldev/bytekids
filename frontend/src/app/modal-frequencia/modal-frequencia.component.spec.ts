import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFrequenciaComponent } from './modal-frequencia.component';

describe('ModalFrequenciaComponent', () => {
  let component: ModalFrequenciaComponent;
  let fixture: ComponentFixture<ModalFrequenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFrequenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFrequenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
