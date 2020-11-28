import { TestBed } from '@angular/core/testing';

import { KeysKeeperService } from './keys-keeper.service';

describe('KeysKeeperService', () => {
  let service: KeysKeeperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeysKeeperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
