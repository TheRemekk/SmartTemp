import { TestBed } from '@angular/core/testing';

import { MeasureSensorsService } from './measure-sensors.service';

describe('MeasureSensorsService', () => {
  let service: MeasureSensorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasureSensorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
