(function(){
    angular
        .module('phoneRepairTracking.repairers')
        .config(config)

    config.$inject = ['$routeProvider'];

    function config($routeProvider){
        $routeProvider
            .when('/repairers',{
                controller: 'RepairListController',
                templateUrl: 'partials/repairerlist.html'
            })

    };
})();
