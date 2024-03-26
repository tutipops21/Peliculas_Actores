import { TestBed } from '@angular/core/testing';

import { PeliculasAcotresService } from './peliculas-acotres.service';

describe('PeliculasAcotresService', () => {
  let service: PeliculasAcotresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeliculasAcotresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
