import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopRegistrationComponent } from './workshop-registration.component';

describe('WorkshopRegistrationComponent', () => {
  let component: WorkshopRegistrationComponent;
  let fixture: ComponentFixture<WorkshopRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
