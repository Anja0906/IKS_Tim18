import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverActiveRideComponent } from './driver-active-ride.component';

describe('DriverActiveRideComponent', () => {
  let component: DriverActiveRideComponent;
  let fixture: ComponentFixture<DriverActiveRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverActiveRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverActiveRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
