import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SudokuService } from '../sudoku.service';

@Component({
  selector: 'app-sudoku',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sudoku.component.html',
  styleUrl: './sudoku.component.css'
})
export class SudokuComponent {
  board: number[][];

  constructor(private sudokuService: SudokuService) {
    this.board = this.sudokuService.board;
  }

  getCellClass(row: number, col: number): string {

    if (this.sudokuService.initialBoard[row][col] !== 0) {
      return 'starting-number';
    }
    if (this.board[row][col] !== 0) {
      return 'inserted-number';
    }
    return 'empty-cell';
  }
}
