import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopRequestService } from '../../services/requests/workshop-request.service';
import { ModalModule } from '../../modal/modal.module';
import { ModalFrequenciaComponent } from '../../modal-frequencia/modal-frequencia.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ModalModule,
    ModalFrequenciaComponent,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  workshops: any[] = [];
  isModalVisible: boolean = false;
  isModalFrequenciaVisible: boolean = false;
  selectedWorkshop: any = null;

  constructor(private workshopService: WorkshopRequestService, private router: Router) {}

  ngOnInit(): void {
    this.getWorkshops();
  }

  getWorkshops() {
    this.workshopService.getWorkshops().subscribe({
      next: (workshops) => {
        this.workshops = workshops;
        console.log(workshops);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openModalFrequencia(workshop: any) {
    this.selectedWorkshop = workshop;
    this.isModalFrequenciaVisible = true;
  }

  closeModalFrequencia() {
    this.isModalFrequenciaVisible = false;
    this.selectedWorkshop = null;
  }

  openModal(workshop: any) {
    this.selectedWorkshop = workshop;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
    this.selectedWorkshop = null;
  }
}
