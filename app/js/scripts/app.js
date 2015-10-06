var S = angular.module('S', ['ui.router', 'ngAnimate']).run(function ($rootScope, $http) {
    $rootScope.data_model = [];
    $rootScope.location = {};
    $http.get('../data/contacts.json').then(function (response) {
        $rootScope.data_model = response.data;
    });
});
