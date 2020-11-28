import { TestBed } from '@angular/core/testing';

import { KeysGuard } from './keys.guard';

describe('KeysGuard', () => {
  let guard: KeysGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(KeysGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
