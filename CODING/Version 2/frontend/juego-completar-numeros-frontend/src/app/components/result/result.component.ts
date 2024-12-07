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
  attemptMessage: string = '';

  constructor(private router: Router, private apiService: ApiService) {}
  ngOnInit(): void {
    // Cargar valores de localStorage
    this.correctCount = parseInt(localStorage.getItem('correctCount') || '0', 10);
    this.timeTaken = parseFloat(localStorage.getItem('timeTaken') || '0');
    this.errorsPerNumber = JSON.parse(localStorage.getItem('errorsPerNumber') || '[]');
    this.totalErrors = parseInt(localStorage.getItem('totalErrors') || '0', 10);
    this.attemptMessage = localStorage.getItem('attemptMessage') || '¡Buen trabajo!';
    
    // Obtener los IDs de paciente y terapeuta desde localStorage
    this.patientName = localStorage.getItem('patientName') || 'Nombre no encontrado';
    this.therapistName = localStorage.getItem('therapistName') || 'Nombre no encontrado';
    this.patientId = localStorage.getItem('patientId') || '';
    this.therapistId = localStorage.getItem('therapistId') || '';
  }

  saveResult() {
    const historyData = {
      observacion: this.observation || 'Sin observación',
      tiempo: this.formatTime(this.timeTaken), // Formatear el tiempo en formato HH:MM:SS
      errores: this.totalErrors,
      aciertos: this.correctCount,
      nombrePaciente: this.patientName, // Guardar el nombre del paciente
      nombreTerapeuta: this.therapistName, // Guardar el nombre del terapeuta
      patient: this.patientId, // Usar el ID del paciente
      therapist: this.therapistId // Usar el ID del terapeuta
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
  
  // Método para formatear el tiempo en formato HH:MM:SS
  private formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
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
