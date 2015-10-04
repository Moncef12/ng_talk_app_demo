(function(){

    angular
        .module('phoneRepairTracking.layout')
        .directive('rtNavBar', rtNavBar)

    function rtNavBar(){
        return {
            restrict: 'E',
            templateUrl : 'partials/navbar.html',
            replace: true
        }
    }
})();
