S.directive('clickOutside', function ($timeout) {
    return {
        link: function (scope, element) {
            element.on('click', function (e) {
                e.stopPropagation();
            });

            $timeout(function () {
                angular.element(element.parent()).on('click', function () {
                    scope.close();
                    console.log('close');
                });
            });

            scope.$on('$destroy', function() {
                angular.element(element.parent()).off('click');
            });
        }
    }
});