import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversNavigationComponent } from './drivers-navigation.component';

describe('DriversNavigationComponent', () => {
  let component: DriversNavigationComponent;
  let fixture: ComponentFixture<DriversNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
