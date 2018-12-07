import { TestBed } from '@angular/core/testing';

import { TickService } from './tick.service';

describe('TickService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TickService = TestBed.get(TickService);
    expect(service).toBeTruthy();
  });
});
