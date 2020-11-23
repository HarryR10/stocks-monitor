import {TestBed} from '@angular/core/testing';

import {ApiKeyLoadServiceService} from './api-key-load-service.service';

describe('ApiKeyLoadServiceService', () => {
    let service: ApiKeyLoadServiceService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ApiKeyLoadServiceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
