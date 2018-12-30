import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';
describe('LoggerService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(LoggerService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=logger.service.spec.js.map