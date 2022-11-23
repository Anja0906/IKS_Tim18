import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCardHolderComponent } from './app-card-holder.component';

describe('AppCardHolderComponent', () => {
  let component: AppCardHolderComponent;
  let fixture: ComponentFixture<AppCardHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppCardHolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCardHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
