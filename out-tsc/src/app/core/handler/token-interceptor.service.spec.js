import { TestBed } from '@angular/core/testing';
import { TokenInterceptorService } from './token-interceptor.service';
describe('TokenInterceptorService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(TokenInterceptorService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=token-interceptor.service.spec.js.map