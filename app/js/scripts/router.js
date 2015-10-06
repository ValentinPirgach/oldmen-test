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