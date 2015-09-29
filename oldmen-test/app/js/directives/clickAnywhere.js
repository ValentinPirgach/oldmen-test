OT.directive('clickAnywhere', function ($rootScope) {
    return {
        link: function (scope, element, attr) {
            $rootScope.co = {};

            angular.element(element).on('click', function (e) {
                $rootScope.$apply(function () {
                    $rootScope.clickList('body');
                });
            });

            $rootScope.clickList = function (param, event) {
                if(event) event.stopPropagation();

                $rootScope.co[param] = !$rootScope.co[param];
                var keys = Object.keys($rootScope.co);

                for(var i in keys) {
                    var option = keys[i];
                    if(option != param) $rootScope.co[option] = false;
                }

                if(param == 'body' || typeof param == 'undefined') {
                    $rootScope.co = {};
                }
            };
        }
    }
});