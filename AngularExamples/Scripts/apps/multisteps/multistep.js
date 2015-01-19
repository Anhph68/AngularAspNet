// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
var formApp = angular.module("formApp", ["ngAnimate", "ui.router"]);

formApp.config(routeConfig);

function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        // route to show our basic form (/form)
        .state("form", {
            url: "/form",
            templateUrl: "Form",
            controller: "formController"
        })
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state("form.profile", {
            url: "/profile",
            templateUrl: "frmProfile"
        })
        // url will be /form/interests
        .state("form.interests", {
            url: "/interests",
            templateUrl: "frmInterests"
        })
        // url will be /form/payment
        .state("form.payment", {
            url: "/payment",
            templateUrl: "frmPayment"
        });

    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise("/form/profile");
};

formApp.controller("formController", function($scope) {
    // we will store all of our form data in this object
    $scope.formData = {};

    // function to process the form
    $scope.processForm = function() {
        alert("awesome!");
    };
});