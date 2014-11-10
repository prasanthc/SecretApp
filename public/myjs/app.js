var secretApp = angular.module("secretApp", ['ngRoute', 'ui.bootstrap']);

secretApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    // $routeProvider.when('/', {
    //     templateUrl: 'home.html',
    //     controller: homeCtrl
    // });

      $routeProvider.when('/', {
          templateUrl: 'home.html',
          controller: 'homeCtrl'          
        });
}])
