import { TestBed } from '@angular/core/testing';

import { SudokuService } from './sudoku.service';

describe('SudokuServiceService', () => {
  let service: SudokuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SudokuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
