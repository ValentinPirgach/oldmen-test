"use strict";
S.controller('listCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$timeout', function ($scope, $rootScope, $stateParams, $location, $timeout) {
    $scope.regions = [];
    $scope.countries = [];


    var storageLocation = {
        set: function (region, country) {
            $rootScope.location = {region: region, country: country};
        },
        get: function (key) {
            return $rootScope.location ? $rootScope.location[key] : $rootScope.location
        }
    };


    var checkInitial = function () {
        var initial = {
            region  : storageLocation.get('region')  || 'Europe',
            country : storageLocation.get('country') || 'Germany'
        };

        var country = $stateParams.country || initial.country;

        console.log('--', $rootScope.data_model);

        if(!$rootScope.data_model.countries[initial.region])
            country = '';

        return {
            region  : $stateParams.region || initial.region,
            country : country
        }
    };


    $timeout(function () {
        ($scope.setInitial = function (obj) {
            $scope.currentRegion  = obj.region;
            $scope.currentCountry = obj.country;
            $scope.countries      = $rootScope.data_model.countries[obj.region];
        })(checkInitial());
    });

    $scope.clickRegion = function () {
        $scope.regions = (!$rootScope.co.regions) ? $rootScope.data_model['regions'] : [];
    };

    $scope.setRegion = function (region) {
        $scope.currentRegion  = region;
        $scope.countries      = $rootScope.data_model.countries[region];
        $scope.currentCountry = ($scope.countries) ? $scope.countries[0] : '';
        if(!$scope.countries)
            $scope.setCountry('');
    };

    $scope.setCountry = function (country) {
        $location.path('region/'+$scope.currentRegion+'/country/'+country);
        storageLocation.set($scope.currentRegion, country);
    };

}]);