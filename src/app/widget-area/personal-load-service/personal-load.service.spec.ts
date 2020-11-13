import {TestBed} from '@angular/core/testing';

import {PersonalLoadService} from './personal-load.service';

describe('PersonalLoadService', () => {
    let service: PersonalLoadService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PersonalLoadService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
