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
