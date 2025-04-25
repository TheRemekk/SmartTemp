import { TestBed } from '@angular/core/testing';

import { MeasureDataService } from './measure-data.service';

describe('MeasureDataService', () => {
  let service: MeasureDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasureDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
