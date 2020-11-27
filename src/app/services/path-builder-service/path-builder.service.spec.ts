import { TestBed } from '@angular/core/testing';

import { PathBuilderService } from './path-builder.service';

describe('PathBuilderService', () => {
  let service: PathBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
