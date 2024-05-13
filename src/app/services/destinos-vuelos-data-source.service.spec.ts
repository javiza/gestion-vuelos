import { TestBed } from '@angular/core/testing';

import { DestinosVuelosDataSourceService } from './destinos-vuelos-data-source.service';

describe('DestinosVuelosDataSourceService', () => {
  let service: DestinosVuelosDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinosVuelosDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
