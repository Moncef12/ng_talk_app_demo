(function(){

    angular
        .module('phoneRepairTracking.phones')
        .config(config)


    config.$inject = ['$routeProvider'];

    function config($routeProvider){
        $routeProvider
            .when('/', {
                redirectTo : '/phones'
            })
            .when('/phones', {
                controller : 'PhoneListController',
                templateUrl: 'partials/phonelist.html'
            })
    }

})();
