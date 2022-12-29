import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRidesComponent } from './pending-rides.component';

describe('PendingRidesComponent', () => {
  let component: PendingRidesComponent;
  let fixture: ComponentFixture<PendingRidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingRidesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
