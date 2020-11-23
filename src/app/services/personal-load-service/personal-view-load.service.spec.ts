import {TestBed} from '@angular/core/testing';

import {PersonalViewLoadService} from './personal-view-load.service';

describe('PersonalLoadService', () => {
    let service: PersonalViewLoadService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PersonalViewLoadService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
