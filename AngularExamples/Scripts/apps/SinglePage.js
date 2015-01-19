var app = angular.module('myApp', ['ui.router']);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: 'Home',
            controller: 'mainCtrl'
        })
        // route for the about page
        .state('about', {
            templateUrl: 'About',
            controller: aboutController
        })
        // route for the contact page
        .state('contact', {
            templateUrl: 'Contact',
            controller: 'contactController'
        });
});

// create the controller and inject Angular's $scope
var aboutController = function ($scope) {
    $scope.message = 'Look! I am an about page.';
}

app.controller('contactController', function ($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});