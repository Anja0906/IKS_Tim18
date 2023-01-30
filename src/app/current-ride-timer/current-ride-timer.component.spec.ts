import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRideTimerComponent } from './current-ride-timer.component';

describe('CurrentRideTimerComponent', () => {
  let component: CurrentRideTimerComponent;
  let fixture: ComponentFixture<CurrentRideTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentRideTimerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentRideTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
