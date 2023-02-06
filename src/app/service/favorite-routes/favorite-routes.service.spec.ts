import { TestBed } from '@angular/core/testing';

import { FavoriteRoutesService } from './favorite-routes.service';

describe('FavoriteRoutesService', () => {
  let service: FavoriteRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
