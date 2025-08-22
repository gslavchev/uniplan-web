import { TestBed } from '@angular/core/testing';

import { LoginAuthService } from '../services/login-auth-service';

describe('LoginAuthService', () => {
  let service: LoginAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginAuthService);
  });
});
