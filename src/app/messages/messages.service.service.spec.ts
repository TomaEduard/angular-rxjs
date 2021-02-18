/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Messages.serviceService } from './messages.service.service';

describe('Service: Messages.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Messages.serviceService]
    });
  });

  it('should ...', inject([Messages.serviceService], (service: Messages.serviceService) => {
    expect(service).toBeTruthy();
  }));
});
