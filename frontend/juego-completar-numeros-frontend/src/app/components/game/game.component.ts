import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  sequence: any[] = [];
  missingNumbers: number[] = [];
  missingIndices: number[] = [];
  userInputs: number[] = [];
  errors: number = 0; // Contador de errores totales
  correctCount: number = 0; // Contador de aciertos
  feedbackMessage: string = '';
  feedbackClass: string = '';
  rangeStart: number = 0;
  rangeEnd: number = 0;
  totalNumbers: number = 0;
  missingCount: number = 0;
  startTime: Date = new Date();
  actualRangeStart: number = 0;
  actualRangeEnd: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setupGame();
  }

  setupGame(): void {
    this.rangeStart = parseInt(localStorage.getItem('rangeStart') || '0', 10);
    this.rangeEnd = parseInt(localStorage.getItem('rangeEnd') || '0', 10);
    this.totalNumbers = parseInt(localStorage.getItem('totalNumbers') || '0', 10);
    this.missingCount = parseInt(localStorage.getItem('missingCount') || '0', 10);

    // Generar secuencia de números
    const startNumber = Math.floor(Math.random() * (this.rangeEnd - this.rangeStart - this.totalNumbers + 1)) + this.rangeStart;
    this.sequence = Array.from({ length: this.totalNumbers }, (_, i) => startNumber + i);

    this.actualRangeStart = this.sequence[0];
    this.actualRangeEnd = this.sequence[this.sequence.length - 1];

    // Seleccionar índices aleatorios para los números faltantes
    this.missingIndices = [];
    while (this.missingIndices.length < this.missingCount) {
      const randomIndex = Math.floor(Math.random() * this.sequence.length);
      if (!this.missingIndices.includes(randomIndex)) {
        this.missingIndices.push(randomIndex);
      }
    }

    this.missingNumbers = this.missingIndices.map(index => this.sequence[index]);

    // Colocar placeholders para los números faltantes
    this.missingIndices.forEach(index => {
      this.sequence[index] = '';
    });

    // Mezclar la secuencia
    this.shuffleArray(this.sequence);

    this.startTime = new Date();
  }

  // Algoritmo de mezcla de Fisher-Yates
  shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  validateInput(): void {
    // Asegurarnos de que `userInputs` contenga solo valores únicos y no vacíos
    const userInputArray = Array.from(new Set(this.userInputs.filter(input => !isNaN(input))));
  
    // Verificar si todos los números ingresados están en `missingNumbers` y coinciden en cantidad
    const isCorrect = userInputArray.length === this.missingNumbers.length &&
                      userInputArray.every(num => this.missingNumbers.includes(num));
  
    if (isCorrect) {
      this.correctCount = this.missingNumbers.length; // Actualizar el contador de aciertos
      this.feedbackMessage = "¡Correcto!";
      this.feedbackClass = 'success';
      this.saveHistoryAndProceed();
    } else {
      this.errors++; // Incrementar contador de errores en cada intento incorrecto
      this.feedbackMessage = "¡Incorrecto! Intenta de nuevo.";
      this.feedbackClass = 'error';
    }
  }

  saveHistoryAndProceed(): void {
    const timeTaken = (new Date().getTime() - this.startTime.getTime()) / 1000; // Tiempo en segundos
    localStorage.setItem('timeTaken', timeTaken.toString());
    localStorage.setItem('totalErrors', this.errors.toString()); // Guardar el total de errores
    localStorage.setItem('correctCount', this.correctCount.toString()); // Guardar el total de aciertos
    this.router.navigate(['/result']);
  }
}
