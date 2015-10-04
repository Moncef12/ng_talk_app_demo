describe('state', function () {

    var stateFilter;

    beforeEach(module('phoneRepairTracking.phones'));

    beforeEach(inject(function (_stateFilter_) {
        stateFilter = _stateFilter_;
    }))

    it('should convert state from number to propoer display string', function () {
        expect(stateFilter(0)).toEqual('En cours');
        expect(stateFilter(1)).toEqual('Réparé');
        expect(stateFilter(2)).toEqual('Non réparable');
    })
})