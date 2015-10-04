(function(){

    angular
        .module('phoneRepairTracking.layout')
        .controller('NavBarMenuController', NavBarMenuController)

    NavBarMenuController.$inject = ['$scope'];

    function NavBarMenuController($scope){
        $scope.items = [
            {
                'name':'Dashborad',
                'url':'/dashboard'
            },
            {
                'name':'Téléphone',
                'url':'/phones'
            },
            {
                'name':'Réparateurs',
                'url':'/repairers'
            },
            {
                'name':'Pièces détachées',
                'url':''
            },
            {
                'name':'Configuration',
                'url':''
            },
        ];
    };

})();
