import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgTableComponent } from './dg-table.component';

describe('DgTableComponent', () => {
  let component: DgTableComponent;
  let fixture: ComponentFixture<DgTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
