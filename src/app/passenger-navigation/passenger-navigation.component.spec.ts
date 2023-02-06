import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerNavigationComponent } from './passenger-navigation.component';

describe('PassengerNavigationComponent', () => {
  let component: PassengerNavigationComponent;
  let fixture: ComponentFixture<PassengerNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
