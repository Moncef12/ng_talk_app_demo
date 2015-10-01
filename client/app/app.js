var app = angular.module('phoneRepairTracking', []);


// $http sera injecté.
// cette injection est une injection implicite.
app.controller('phoneListCtrl', function($scope, $http){

    // $http est un service qui permet de faire
    // requetes http, et il retourne des promises.
    $http.get('data/phones.json').then(function (response) {
        $scope.phones = response.data;
    })

    $scope.remove = function (phone) {
        $scope.phones.splice($scope.phones.indexOf(phone), 1);
    }

    $scope.markAsRepaired = function (phone) {
        phone.progress = 100;
    }
})



