import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutRideComponent } from './about-ride.component';

describe('AboutRideComponent', () => {
  let component: AboutRideComponent;
  let fixture: ComponentFixture<AboutRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
