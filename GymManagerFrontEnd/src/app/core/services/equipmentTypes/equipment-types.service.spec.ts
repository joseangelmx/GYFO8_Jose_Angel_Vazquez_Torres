import { TestBed } from '@angular/core/testing';

import { EquipmentTypesService } from './equipment-types.service';

describe('EquipmentTypesService', () => {
  let service: EquipmentTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
