import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanicsComponent } from './panics.component';

describe('PanicsComponent', () => {
  let component: PanicsComponent;
  let fixture: ComponentFixture<PanicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
