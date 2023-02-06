import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideNotificationsComponent } from './ride-notifications.component';

describe('RideNotificationsComponent', () => {
  let component: RideNotificationsComponent;
  let fixture: ComponentFixture<RideNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
