import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDrversComponent } from './about-drvers.component';

describe('AboutDrversComponent', () => {
  let component: AboutDrversComponent;
  let fixture: ComponentFixture<AboutDrversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutDrversComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutDrversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
