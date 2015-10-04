(function(){

    angular
        .module('phoneRepairTracking.repairers')
        .controller('RepairListController', RepairListController);

    RepairListController.$inject =  ['$scope', 'dataService'];

    function RepairListController($scope, dataService){

        activate();
        //////////////////
        function activate(){
            dataService.getRepairers().then(function (response) {
                $scope.repairers = response.data;
            })
        }
    }

})();
