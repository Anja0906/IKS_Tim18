import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanicNotificationsComponent } from './panic-notifications.component';

describe('PanicNotificationsComponent', () => {
  let component: PanicNotificationsComponent;
  let fixture: ComponentFixture<PanicNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanicNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanicNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
