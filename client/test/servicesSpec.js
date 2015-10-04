describe('dataService', function () {
    var dataService;
    var $httpBackend;
    var phones = [
        {"name":"s3 galaxy", "manufacture":"samsung", "imgage":"", "problem":"battery not working", "progress":60, "date_in":"12-09-2015", "state":0},
        {"name":"iphone 6", "manufacture":"apple", "imgage":"", "problem": "facebook app not installed !! big deal", "progress":0, "date_in":"30-09-2015", "state":0},
        {"name":"ipad", "manufacture":"apple", "imgage":"", "problem": "damaged screen", "progress":100, "date_in":"01-09-2015", "state":2}
    ];

    beforeEach(module('phoneRepairTracking.core'));

    beforeEach(inject(function (_dataService_, _$httpBackend_) {
        dataService = _dataService_;
        $httpBackend = _$httpBackend_;
    }));

    describe('gePhones', function () {
        it('should return phones', function () {
            $httpBackend.expectGET('data/phones.json').respond(200, phones);

            dataService.getPhones().then(function (response) {
                expect(response.data).toEqual(phones);
            });
            $httpBackend.flush();
        })
    })
})