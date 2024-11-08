// src/app/components/result/result.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  observation: string = '';
  correctCount: number = 0;
  timeTaken: number = 0;
  errorsPerNumber: number[] = [];
  totalErrors: number = 0;
  patientName: string = '';
  therapistName: string = '';
  patientId: string = '';
  therapistId: string = '';

  constructor(private router: Router, private apiService: ApiService) {}
  ngOnInit(): void {
    // Cargar valores de localStorage
    this.correctCount = parseInt(localStorage.getItem('correctCount') || '0', 10);
    this.timeTaken = parseFloat(localStorage.getItem('timeTaken') || '0');
    this.errorsPerNumber = JSON.parse(localStorage.getItem('errorsPerNumber') || '[]');
    this.totalErrors = this.errorsPerNumber.reduce((sum, error) => sum + error, 0);
    
    // Obtener los IDs de paciente y terapeuta desde localStorage
    this.patientName = localStorage.getItem('patientName') || 'Nombre no encontrado';
    this.therapistName = localStorage.getItem('therapistName') || 'Nombre no encontrado';
    this.patientId = localStorage.getItem('patientId') || '';
    this.therapistId = localStorage.getItem('therapistId') || '';
  }


  // saveResult() {
  //   const patientId = localStorage.getItem('patientId');

  //   if (patientId) {
  //     const gameData = {
  //       patient: patientId,
  //       errorsPerNumber: this.errorsPerNumber,
  //       totalErrors: this.totalErrors,
  //       timeTaken: this.timeResult,
  //     };

  //     this.apiService.addGameHistory(gameData).subscribe(
  //       (response) => {
  //         alert('Resultado guardado exitosamente.');
  //       },
  //       (error) => {
  //         alert('Error al guardar el resultado.');
  //       }
  //     );
  //   } else {
  //     alert('No se encontró el ID del paciente.');
  //   }
  // }
  saveResult() {
    const historyData = {
      observacion: this.observation,
      tiempo: this.timeTaken,
      errores: this.totalErrors,
      aciertos: this.correctCount,
      patient: localStorage.getItem('patientId'),  // Make sure 'patientId' is stored as an ObjectId
      therapist: localStorage.getItem('therapistId')
    };

    this.apiService.saveGameHistory(historyData).subscribe(
      (response) => {
        console.log('Historial guardado:', response);
        this.router.navigate(['/history']);
      },
      (error) => {
        console.error('Error al guardar el historial:', error);
      }
    );
  }
  // saveHistory() {
  //   const patientId = localStorage.getItem('patientId'); // Suponiendo que el ID del paciente está almacenado
  //   const therapistId = localStorage.getItem('therapistId'); // Suponiendo que el ID del terapeuta está almacenado

  //   const historyData = {
  //     observation: this.observation,
  //     time: parseFloat(this.timeTaken),
  //     errors: this.totalErrors,
  //     patient: patientId,
  //     therapist: therapistId
  //   };

  //   this.apiService.saveGameHistory(historyData).subscribe(
  //     () => {
  //       alert('Historial guardado exitosamente');
  //       this.router.navigate(['/']); // Redirigir a la página principal o donde desees
  //     },
  //     (error) => {
  //       console.error('Error al guardar el historial:', error);
  //     }
  //   );
  // }
  retryGame() {
    this.router.navigate(['/game']);
  }

  newGame() {
    localStorage.removeItem('rangeStart');
    localStorage.removeItem('rangeEnd');
    localStorage.removeItem('totalNumbers');
    localStorage.removeItem('missingCount');
    this.router.navigate(['/config']);
  }

  goToMain() {
    this.router.navigate(['/']);
  }
}
