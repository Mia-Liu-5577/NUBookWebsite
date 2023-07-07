import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import {AdapterService} from '../adapter.service';
import {HttpClientModule} from '@angular/common/http';

describe('ProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));
});
