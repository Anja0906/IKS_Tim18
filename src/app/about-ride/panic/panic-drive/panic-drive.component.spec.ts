import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanicDriveComponent } from './panic-drive.component';

describe('PanicDriveComponent', () => {
  let component: PanicDriveComponent;
  let fixture: ComponentFixture<PanicDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanicDriveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanicDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
