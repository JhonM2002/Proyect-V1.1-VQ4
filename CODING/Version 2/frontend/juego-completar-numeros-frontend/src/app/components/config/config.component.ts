import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {
  therapistName: string = '';
  patientName: string = '';
  therapistCedula: string = '';
  patientCedula: string = '';
  inicioRango: number | null = null;
  finRango: number | null = null;
  longitudSecuencia: number | null = null;
  cantidadNumeros: number | null = null;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    // Recuperar los nombres y cédulas desde localStorage
    this.therapistCedula = localStorage.getItem('therapistCedula') || '';
    this.patientCedula = localStorage.getItem('patientCedula') || '';

    // Obtener los nombres desde el backend si no están almacenados
    if (this.therapistCedula) {
      this.apiService.getTherapistByCedula(this.therapistCedula).subscribe(
        (therapist) => {
          this.therapistName = therapist.nombre;
          localStorage.setItem('therapistName', this.therapistName); // Guardar el nombre en localStorage
        },
        (error) => {
          console.error('Error al obtener el terapeuta:', error);
        }
      );
    } else {
      console.error('Cédula del terapeuta no encontrada.');
    }

    if (this.patientCedula) {
      this.apiService.getPatientByCedula(this.patientCedula).subscribe(
        (patient) => {
          this.patientName = patient.nombre;
          localStorage.setItem('patientName', this.patientName); // Guardar el nombre en localStorage
        },
        (error) => {
          console.error('Error al obtener el paciente:', error);
        }
      );
    } else {
      console.error('Cédula del paciente no encontrada.');
    }
  }

  // Método para iniciar el juego
  startGame() {
    if (
      this.inicioRango !== null &&
      this.finRango !== null &&
      this.longitudSecuencia !== null &&
      this.cantidadNumeros !== null &&
      this.inicioRango < this.finRango &&
      this.longitudSecuencia > 0 &&
      this.cantidadNumeros > 0 &&
      this.cantidadNumeros < this.longitudSecuencia &&
      this.longitudSecuencia <= this.finRango - this.inicioRango + 1
    ) {
      // Guardar configuración en localStorage
      localStorage.setItem('rangeStart', this.inicioRango.toString());
      localStorage.setItem('rangeEnd', this.finRango.toString());
      localStorage.setItem('totalNumbers', this.longitudSecuencia.toString());
      localStorage.setItem('missingCount', this.cantidadNumeros.toString());
      this.router.navigate(['/game']);
    } else {
      alert('Por favor, ingrese valores válidos.');
    }
  }
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
