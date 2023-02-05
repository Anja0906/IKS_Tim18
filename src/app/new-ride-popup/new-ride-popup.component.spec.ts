import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRidePopupComponent } from './new-ride-popup.component';

describe('NewRidePopupComponent', () => {
  let component: NewRidePopupComponent;
  let fixture: ComponentFixture<NewRidePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRidePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRidePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
