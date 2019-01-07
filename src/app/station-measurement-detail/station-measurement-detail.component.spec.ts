import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationMeasurementDetailComponent } from './station-measurement-detail.component';

describe('StationMeasurementDetailComponent', () => {
  let component: StationMeasurementDetailComponent;
  let fixture: ComponentFixture<StationMeasurementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationMeasurementDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationMeasurementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
