"use strict";
S.controller('contactsCtrl', ['$scope', '$rootScope', '$stateParams', '$location', function ($scope, $rootScope, $stateParams, $location) {
    var country = ($stateParams.country.length) ? $stateParams.country : $stateParams.region;
    $scope.contacts = $rootScope.data_model.contacts[country];

    $scope.close = function () {
        $location.path('/');
    }
}]);
