import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationDetailViewComponent } from './station-detail-view.component';

describe('StationDetailViewComponent', () => {
  let component: StationDetailViewComponent;
  let fixture: ComponentFixture<StationDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
