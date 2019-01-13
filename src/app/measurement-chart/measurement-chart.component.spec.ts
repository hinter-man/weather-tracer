import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementChartComponent } from './measurement-chart.component';

describe('MeasurementChartComponent', () => {
  let component: MeasurementChartComponent;
  let fixture: ComponentFixture<MeasurementChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
