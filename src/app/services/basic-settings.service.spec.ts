import { TestBed } from '@angular/core/testing';

import { BasicSettingsService } from './basic-settings.service';

describe('BasicSettingsService', () => {
  let service: BasicSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
