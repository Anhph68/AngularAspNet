var app = angular.module("myApp", ["ui.router", "angular-loading-bar"]);
app.config(routeConfig)
    .config(function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    });

function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "Home",
            controller: "mainCtrl"
        })
        // route for the about page
        .state("about", {
            url: "/about",
            views: {
                // the main template will be placed here (relatively named)
                '': { templateUrl: "About" },

                // the child views will be defined here (absolutely named)
                'columnOne@about': { template: "Look I am a column!" },

                // for column two, we'll define a separate controller 
                'columnTwo@about': {
                    templateUrl: "Table",
                    controller: "scotchController"
                }
            }
        })
        //// route for the contact page
        //.state('contact', {
        //    templateUrl: 'Contact',
        //    controller: 'contactController'
        //});
        // HOME STATES AND NESTED VIEWS ========================================
        .state("contact", {
            url: "/contact",
            templateUrl: "Contact"
        })
        // nested list with custom controller
        .state("contact.list", {
            url: "/list",
            templateUrl: "List",
            controller: function($scope) {
                $scope.dogs = ["Bernese", "Husky", "Goldendoodle"];
            }
        })

        // nested list with just some random string data
        .state("contact.paragraph", {
            url: "/paragraph",
            template: "I could sure use a drink right now."
        });
};

app.controller("scotchController", function($scope) {
    $scope.message = "test";
    $scope.scotches = [
        {
            name: "Macallan 12",
            price: 50
        },
        {
            name: "Chivas Regal Royal Salute",
            price: 10000
        },
        {
            name: "Glenfiddich 1937",
            price: 20000
        }
    ];
});