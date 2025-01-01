import {Injectable} from '@angular/core';
import {map} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {
  private _board: number[][];
  private _initialBoard: number[][];
  public currentCell: { row: number, col: number } | null = null;

  constructor(private http: HttpClient) {
    this._board = [
      [0, 0, 0, 6, 0, 1, 0, 5, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 6, 8, 0, 0, 7, 0, 1],
      [0, 6, 4, 3, 0, 0, 0, 0, 7],
      [7, 0, 0, 0, 0, 0, 9, 0, 0],
      [0, 0, 0, 0, 2, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 2, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 9, 0, 0, 0, 0, 0]
    ];
    this._initialBoard = JSON.parse(JSON.stringify(this._board));
  }

  get initialBoard(): number[][] {
    return this._initialBoard;
  }

  get board(): number[][] {
    return this._board;
  }

  async newBoard(): Promise<void> {
    this._board = await this.fetchNewBoard();
    console.log(this._board);
    this._initialBoard = JSON.parse(JSON.stringify(this._board));
  }

  fetchNewBoard(): Promise<number[][]> {
    const url = 'https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}';
    return firstValueFrom(
      this.http.get<any>(url).pipe(
        map((response) => {
          if (response && response.newboard && response.newboard.grids && response.newboard.grids[0]) {
            return response.newboard.grids[0].value;
          } else {
            throw new Error('Unexpected API response structure');
          }
        })
      )
    );
  }

  public async solveSudoku(callback: () => void, delay: number, board: number[][] = this._board, n: number = 9): Promise<boolean> {

    let row = -1;
    let col = -1;
    let isEmpty = true;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] == 0) {
          row = i;
          col = j;
          isEmpty = false;
          break;
        }
      }
      if (!isEmpty) {
        break;
      }
    }

    if (isEmpty) {
      return true;
    }

    for (let num = 1; num <= n; num++) {
      if (this.moveIsValid(board, row, col, num)) {
        board[row][col] = num;
        this.currentCell = {row, col};
        callback();
        await new Promise(resolve => setTimeout(resolve, delay));
        if (await this.solveSudoku(callback, delay, board, n)) {
          return true;
        } else {
          board[row][col] = 0;
          this.currentCell = {row, col};
          callback();
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    this.currentCell = null;
    return false;
  }

  private moveIsValid(board: number[][], row: number, col: number, num: number): boolean {
    for (let x = 0; x <= 8; x++)
      if (board[row][x] == num)
        return false;

    for (let x = 0; x <= 8; x++)
      if (board[x][col] == num)
        return false;

    let startRow = row - row % 3,
      startCol = col - col % 3;

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (board[i + startRow][j + startCol] == num)
          return false;
    return true;
  }
}
