import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSecondWindowComponent } from './login-second-window.component';

describe('LoginSecondWindowComponent', () => {
  let component: LoginSecondWindowComponent;
  let fixture: ComponentFixture<LoginSecondWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSecondWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSecondWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
