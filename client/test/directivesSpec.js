describe('rtProgressBar', function () {
    var $compile;
    var $rootScope;

    beforeEach(module('phoneRepairTracking'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }))


    it('should replace directive element with the template', function () {
        var element = $compile('<rt-progress-bar percentage="100"></rt-progress-bar>')($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain('class="progress"');
    })

    it('should show input text when we click over the directive element', function () {
        var scope = $rootScope.$new();
        var element = $compile('<rt-progress-bar percentage="60"></rt-progress-bar>')(scope);
        var input = element[0].querySelector('input[type=text]');
        element[0].querySelector('.progress').click();
        scope.$digest();
        expect(input.classList.contains('ng-hide')).toBe(false);
    })

    it('should not show input text when the percentage is 100', function () {
        var scope = $rootScope.$new();
        var element = $compile('<rt-progress-bar percentage="100"></rt-progress-bar>')(scope);
        var input = element[0].querySelector('input[type=text]');
        element[0].querySelector('.progress').click();
        scope.$digest();
        expect(input.classList.contains('ng-hide')).toBe(true);
    })


    it('should change the progress from input', function () {
        var scope = $rootScope.$new();
        var element = $compile('<rt-progress-bar percentage="15"></rt-progress-bar>')(scope);
        var input = element[0].querySelector('input[type=text]');
        element[0].querySelector('.progress').click();
        angular.element(input).val(60).triggerHandler('input');
        angular.element(input).triggerHandler('blur');
        scope.$digest();
        expect(parseInt(element.isolateScope().percentage, 10)).toBe(60);
    })

    it('should hide input when be enter the blur event is fire', function () {
        var scope = $rootScope.$new();
        var element = $compile('<rt-progress-bar percentage="15"></rt-progress-bar>')(scope);
        var input = element[0].querySelector('input[type=text]');
        element[0].querySelector('.progress').click();
        angular.element(input).triggerHandler('blur');
        scope.$digest();
        expect(input.classList.contains('ng-hide')).toBe(true);
    })
})