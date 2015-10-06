var S = angular.module('S', ['ui.router', 'ngAnimate']).run(function ($rootScope, $http) {
    $rootScope.data_model = [];
    $rootScope.location = {};
    $http.get('../data/contacts.json').then(function (response) {
        $rootScope.data_model = response.data;
    });
});

"use strict";
S.controller('contactsCtrl', ['$scope', '$rootScope', '$stateParams', '$location', function ($scope, $rootScope, $stateParams, $location) {
    var country = ($stateParams.country.length) ? $stateParams.country : $stateParams.region;
    $scope.contacts = $rootScope.data_model.contacts[country];

    $scope.close = function () {
        $location.path('/');
    }
}]);

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
S.directive('clickAnywhere', function ($rootScope) {
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
S.config(function ($urlMatcherFactoryProvider) {
    $urlMatcherFactoryProvider.caseInsensitive(true);
    $urlMatcherFactoryProvider.strictMode(false);
});

S.config(function($sceProvider, $stateProvider, $urlRouterProvider ) {
    $urlRouterProvider.otherwise('');
    $stateProvider
        .state('index', {
            url: '',
            templateUrl: 'views/tplChoose.html'
        })
        .state('contacts', {
            url: '/region/:region/country/:country',
            templateUrl: 'views/tplContacts.html'
        })
});