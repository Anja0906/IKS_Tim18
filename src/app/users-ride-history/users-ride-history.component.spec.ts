import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRideHistoryComponent } from './users-ride-history.component';

describe('UsersRideHistoryComponent', () => {
  let component: UsersRideHistoryComponent;
  let fixture: ComponentFixture<UsersRideHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersRideHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersRideHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
