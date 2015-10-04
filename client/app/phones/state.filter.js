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
