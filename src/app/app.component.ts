import {Component, ViewChild} from '@angular/core';
import { SudokuComponent } from './sudoku/sudoku.component';
import { SudokuService } from './sudoku.service';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SudokuComponent, MatSlider, MatSliderThumb, MatButton, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SudokuViz';
  delay: number = 100;

  @ViewChild(SudokuComponent) sudokuComponent!: SudokuComponent;

  constructor(private sudokuService: SudokuService) {}

  public async startSolving(): Promise<void> {
    const result = await this.sudokuService.solveSudoku(() => {}, this.delay);

    if (!result) {
      alert("Sudoku is unsolvable")
    }
  }

  public reset() {
    window.location.reload();
  }

  public async generateSudoku(): Promise<void> {
    await this.sudokuService.newBoard();
    this.sudokuComponent.updateBoard();
  }
}
