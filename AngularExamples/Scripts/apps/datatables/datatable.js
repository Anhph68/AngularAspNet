var app = angular.module("myApp", ["ui.router", "datatables", "angular-loading-bar"]);
app.config(routeConfig)
    .config(function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    });

function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/basic");
    $stateProvider
        .state("basic", {
            url: "/basic",
            views: {
                '': {
                    templateUrl: "Basic",
                    controller: "mainCtrl"
                },
                'json@basic': {
                    templateUrl: "LoadJson",
                    controller: "loadJsonCtrl"
                }
            }
        })
        .state("json", {
            url: "/json",
            templateUrl: "LoadJson",
            controller: 'loadJsonCtrl'
        })
        .state("apps", {
            url: "/apps",
            templateUrl: "AppList",
            controller: 'AppsCtrl'
        });
};

app.controller("mainCtrl", function (DTOptionsBuilder, DTColumnDefBuilder) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withPaginationType("full_numbers")
        //.withDisplayLength(2)
        .withBootstrap();

    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2).notSortable()
    ];
});

app.controller("loadJsonCtrl", function (DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder
        .fromSource('../../Scripts/apps/data.json')
        .withPaginationType('full_numbers')
        .withBootstrap();
    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID').withClass('col-md-1 text-left'),
        DTColumnBuilder.newColumn('firstName').withTitle('First name'),
        DTColumnBuilder.newColumn('lastName').withTitle('Last name')//.notVisible()
    ];
});

app.controller("AppsCtrl", function (DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder
        //.fromSource('GetAppList')
        .newOptions()
        .withOption('ajax', {
            // Either you specify the AjaxDataProp here
            // dataSrc: 'data',
            url: 'GetAppList',
            type: 'POST'
        })
        // or here
        .withDataProp('data')
        .withOption('serverSide', true)
        .withPaginationType('full_numbers')
        .withBootstrap();
    vm.dtColumns = [
        DTColumnBuilder.newColumn('col0').withTitle('Id').withClass('col-md-1'),
        DTColumnBuilder.newColumn('col1').withTitle('Name of Application'),
        DTColumnBuilder.newColumn('col2').withTitle('Url').withClass('col-md-2')
    ];
});