import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsNavigationComponent } from './admins-navigation.component';

describe('AdminsNavigationComponent', () => {
  let component: AdminsNavigationComponent;
  let fixture: ComponentFixture<AdminsNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
