var app = angular.module('phoneRepairTracking', []);


app.controller('phoneListCtrl', function($scope){
    $scope.phones = [
        {"name":"s3 galaxy", "manufacture":"samsung", "imgage":"", "problem":"battery not working", "progress":60},
        {"name":"iphone 6", "manufacture":"apple", "imgage":"", "problem": "facebook app not installed !! big deal", "progress":0},
        {"name":"ipad", "manufacture":"apple", "imgage":"", "problem": "damaged screen", "progress":100},
        {"name":"s3 galaxy", "manufacture":"nokia", "imgage":"", "problem": "damaged screen", "progress":100},
    ];

    $scope.remove = function (phone) {
        $scope.phones.splice($scope.phones.indexOf(phone), 1);
    }

    $scope.markAsRepaired = function (phone) {
        phone.progress = 100;
    }
})



