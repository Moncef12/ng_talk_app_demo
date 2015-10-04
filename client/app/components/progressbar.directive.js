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
