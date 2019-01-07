import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationMeasurementComponent } from './station-measurement.component';

describe('StationMeasurementComponent', () => {
  let component: StationMeasurementComponent;
  let fixture: ComponentFixture<StationMeasurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationMeasurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
