import { Component } from '@angular/core';
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

  constructor(private sudokuService: SudokuService) {}

  public async startSolving(): Promise<void> {
    await this.sudokuService.solveSudoku(() => {
      // Trigger change detection to update the board in the template
    }, this.delay);
  }

  public reset() {
    window.location.reload();
  }
}
