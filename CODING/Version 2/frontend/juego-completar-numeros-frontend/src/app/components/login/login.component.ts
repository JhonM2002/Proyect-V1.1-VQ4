import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  therapists: { nombre: string; cedula: string }[] = [];
  patients: { nombre: string; cedula: string }[] = [];
  selectedTherapistCedula: string = '';
  selectedPatientCedula: string = '';

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadTherapists();
    this.loadPatients();
  }

  // Carga los terapeutas
  loadTherapists(): void {
    this.apiService.getTherapists().subscribe(
      (therapists) => {
        this.therapists = therapists;
      },
      (error) => {
        alert('Error al cargar los terapeutas');
      }
    );
  }
  loadPatients(): void {
    this.apiService.getPatients().subscribe(
      (patients) => {
        this.patients = patients;
      },
      (error) => {
        alert('Error al cargar los pacientes');
      }
    );
  }

  goToConfiguration(): void {
    if (this.selectedTherapistCedula && this.selectedPatientCedula) {
      // Encuentra los nombres de terapeuta y paciente seleccionados
      const selectedTherapist = this.therapists.find(
        (t) => t.cedula === this.selectedTherapistCedula
      );
      const selectedPatient = this.patients.find(
        (p) => p.cedula === this.selectedPatientCedula
      );
  
      if (selectedTherapist && selectedPatient) {
        // Guarda los datos seleccionados en el localStorage
        localStorage.setItem('therapistName', selectedTherapist.nombre);
        localStorage.setItem('patientName', selectedPatient.nombre);
        localStorage.setItem('therapistCedula', this.selectedTherapistCedula);
        localStorage.setItem('patientCedula', this.selectedPatientCedula);
  
        // Navega a la página de configuración
        this.router.navigate(['/config']);
      }
    } else {
      alert('Por favor, seleccione un terapeuta y un paciente');
    }
  }

  goToHistory(): void {
    this.router.navigate(['/history']);
  }
}
