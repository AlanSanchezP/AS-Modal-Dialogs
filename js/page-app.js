(function () {
    'use strict';

    function appConfig($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: '',
                title: 'Home'
            })
            .when('/demos', {
                templateUrl: 'views/demos.html',
                controller: '',
                title: 'Demos'
            })
            .when('/api', {
                templateUrl: 'views/api.html',
                controller: '',
                title: 'API'
            })
            .when('/install', {
                templateUrl: 'views/install.html',
                controller: '',
                title: 'Install'
            })
            .when('/error', {
            templateUrl: 'views/404.html',
            title: 'Error 404'
            })
            .otherwise({
            redirectTo: '/error'
          });
    }

    appConfig.$inject = ['$routeProvider'];

    function appRun($location, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.title = current.$$route.title;
            window.scrollTo(0,0);
        });
    }

    appRun.$inject = ['$location', '$rootScope'];

    angular.module(
        'asModalDialogsPage',
        [
            'asModalDialogs',
            'ngRoute'
        ]
    )
    	.config(appConfig)
        .run(appRun);
}());
