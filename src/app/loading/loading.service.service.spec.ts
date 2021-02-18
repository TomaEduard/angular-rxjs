/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Loading.serviceService } from './loading.service.service';

describe('Service: Loading.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Loading.serviceService]
    });
  });

  it('should ...', inject([Loading.serviceService], (service: Loading.serviceService) => {
    expect(service).toBeTruthy();
  }));
});
