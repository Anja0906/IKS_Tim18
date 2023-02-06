import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFavoriteRouteComponent } from './add-favorite-route.component';

describe('AddFavoriteRouteComponent', () => {
  let component: AddFavoriteRouteComponent;
  let fixture: ComponentFixture<AddFavoriteRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFavoriteRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFavoriteRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
