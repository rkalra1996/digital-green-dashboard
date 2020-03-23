import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCoreComponent } from './dashboard-core.component';

describe('DashboardCoreComponent', () => {
  let component: DashboardCoreComponent;
  let fixture: ComponentFixture<DashboardCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
