angular.module('phoneRepairTracking', [
    // app modules.
    'phoneRepairTracking.core',
    'phoneRepairTracking.phones',
    'phoneRepairTracking.repairers',
    'phoneRepairTracking.layout',
    'phoneRepairTracking.components',
]);
(function(){
    angular
        .module('phoneRepairTracking')
        .config(function config() {
            // Global config. of the app.
            // For exemple, if we have a loggerProvider, or, localStorageProvider
        })

})();

angular.module('phoneRepairTracking.components', []);

angular.module('phoneRepairTracking.core', [
    // third party modules
    'ngRoute'
]);
angular.module('phoneRepairTracking.layout', []);
angular.module('phoneRepairTracking.phones', ['phoneRepairTracking.core']);

angular.module('phoneRepairTracking.repairers', []);

(function(){

angular
    .module('phoneRepairTracking.components')
    /*    .fact ory('rtProgressBar', rtProgressBar) exception to 1 type per file rule, when doing directive you could craete a service  that goes with it ...*/
    .directive('rtProgressBar', function(){
        return {

            scope: {
                percentage:'=',
                text: '@'
            },
            replace: true,
            template: '<div>' +
            '<div class="progress"> ' +
            '<div class="progress-bar" role="progressbar" aria-valuenow="{{percentage}}" aria-valuemin="0" aria-valuemax="100" style="width: {{percentage}}%;"> ' +
            '{{text +\':\'+  percentage}} %' +
            '</div></div> <input id="edit-progress" ng-show="editProgress" type="text" ng-model="percentage"/><a href="#" ng-click="vm.toggleEditProgress()"></a>' +
            '</div>',

            link: link,
            controller: controller,
            controllerAs: 'vm'
        }

        function link(scope, element, attrs, ctrl){

            angular.element(element[0].querySelector('.progress')).bind('click', function (e) {
                if(scope.percentage < 100){
                    ctrl.toggleEditProgress();
                    // parceque, on a utilisé un evenement click standart, donc, on est hors
                    // angular contexte, on doit, lancer le $digest loop, avec $apply()
                    scope.$apply();
                }
            })

            angular.element(element[0].querySelector('#edit-progress')).bind('blur', function (e) {
                ctrl.toggleEditProgress();
                // parceque, on a utilisé un evenement click standart, donc, on est hors
                // angular contexte, on doit, lancer le $digest loop, avec $apply()
                scope.$apply();
            })
        }

        function controller($scope){

            activate();

            this.toggleEditProgress = toggleEditProgress;
            ////////////////////
            function activate(){
                $scope.editProgress = false;
            }

            function toggleEditProgress(){
                $scope.editProgress = ! $scope.editProgress;
            }
        }
    });

})();

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

(function(){
    angular
        .module('phoneRepairTracking.phones')
        .filter('state', function(){
            return function(input){
                var output;

                switch (input){
                    case 0:
                        output = 'En cours';
                        break;
                    case 1:
                        output = 'Réparé';
                        break;
                    case 2:
                        output = 'Non réparable';
                        break;
                }

                return output;
            }
        })
})();

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

// factory est un service, une simple function qui retourne
// un objet.

(function(){
    angular
        .module('phoneRepairTracking.core')
        .factory('dataService', function($http){
            return {
                getPhones:getPhones,
                getRepairers: getRepairers
            }

            //////////////////////////
            function getPhones() {
                return $http.get('data/phones.json');
            }

            function getRepairers(){
                return $http.get('data/repairers.json');
            }
        })

})();
