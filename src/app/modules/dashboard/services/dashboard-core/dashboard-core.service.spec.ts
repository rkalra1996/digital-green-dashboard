import { TestBed } from '@angular/core/testing';

import { DashboardCoreService } from './dashboard-core.service';

describe('DashboardCoreService', () => {
  let service: DashboardCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
