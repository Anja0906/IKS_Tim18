import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateVehicleComponent } from './rate-vehicle.component';

describe('RateVehicleComponent', () => {
  let component: RateVehicleComponent;
  let fixture: ComponentFixture<RateVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
