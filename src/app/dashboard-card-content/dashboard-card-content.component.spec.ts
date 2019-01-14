import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCardContentComponent } from './dashboard-card-content.component';

describe('DashboardCardContentComponent', () => {
  let component: DashboardCardContentComponent;
  let fixture: ComponentFixture<DashboardCardContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCardContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
