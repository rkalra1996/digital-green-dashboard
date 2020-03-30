import { TestBed } from '@angular/core/testing';

import { DashboardFilterUtilityService } from './dashboard-filter-utility.service';

describe('DashboardFilterUtilityService', () => {
  let service: DashboardFilterUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardFilterUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
