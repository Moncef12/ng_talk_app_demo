describe('phoneListCtrl', function () {

    beforeEach(module('phoneRepairTracking.phones'));

    var $controller;
    var $rootScope;
    var $httpBackend;
    var phones = [
        {"name":"s3 galaxy", "manufacture":"samsung", "imgage":"", "problem":"battery not working", "progress":60, "date_in":"12-09-2015", "state":0},
        {"name":"iphone 6", "manufacture":"apple", "imgage":"", "problem": "facebook app not installed !! big deal", "progress":0, "date_in":"30-09-2015", "state":0}
    ]

    beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;

        $httpBackend
            .expectGET('data/phones.json')
            .respond(200, phones)
    }));

    describe('$scope.phones', function () {
        it('should be defined', function () {
            var scope = $rootScope.$new();
            var phoneListCtrl = $controller('PhoneListController', {$scope: scope});
            $httpBackend.flush();
            expect(scope.phones).toBeDefined();
        })
    })

    describe('markAsRepaired', function () {
        it('should mark phone as repaired', function () {
            var scope = $rootScope.$new();
            var phoneListCtrl = $controller('PhoneListController', {$scope: scope});
            scope.markAsRepaired(phones[1]);
            expect(phones[1].state).toBe(1);
        })
    })

    describe('markAsUnrepared', function () {
        it('should change state of phone to unrepaired', function () {
            var scope = $rootScope.$new();
            var phoneListCtrl = $controller('PhoneListController', {$scope: scope});
            scope.markAsUnrepared(phones[1]);
            expect(phones[1].state).toBe(2);
        })
    })

    describe('traited', function () {
        it('should tell if phone is repaired', function () {
            var scope = $rootScope.$new();
            var phoneListCtrl = $controller('PhoneListController', {$scope: scope});
            expect(scope.traited(phones[0])).toBe(false);
        })
    })
})