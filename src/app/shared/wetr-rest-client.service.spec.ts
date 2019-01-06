import { TestBed, inject } from '@angular/core/testing';

import { WetrRestClientService } from './wetr-rest-client.service';

describe('WetrRestClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WetrRestClientService]
    });
  });

  it('should be created', inject([WetrRestClientService], (service: WetrRestClientService) => {
    expect(service).toBeTruthy();
  }));
});
