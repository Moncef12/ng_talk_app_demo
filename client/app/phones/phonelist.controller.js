(function(){

    angular
        .module('phoneRepairTracking.phones')
        .controller('PhoneListController', PhoneListController)

    PhoneListController.$inject = ['$scope', 'dataService'];

    function PhoneListController($scope, dataService){

        // $http est un service qui permet de faire
        // requetes http, et il retourne des promises.
        dataService.getPhones().then(function (response) {
            $scope.phones = response.data;
        })

        $scope.markAsUnrepared = function (phone) {
            //$scope.phones.splice($scope.phones.indexOf(phone), 1);
            phone.state = 2;
        }

        $scope.markAsRepaired = function (phone) {
            phone.progress = 100;
            phone.state = 1;
        }

        $scope.traited = function (phone) {
            return phone.state > 0;
        }
    };

})();
