var app = angular.module("myApp", ["ui.router", "datatables", 'angular-loading-bar']);
app.config(routeConfig)
    .config(function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    });
app.run(function ($rootScope, cfpLoadingBar) {
    $rootScope.$on('$stateChangeStart', function () {
        cfpLoadingBar.start();
    });
    $rootScope.$on('$stateChangeSuccess', function () {
        cfpLoadingBar.complete();
    });
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

app.controller("loadJsonCtrl", function ($scope, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder
        .fromSource('../../Scripts/apps/data.json')
        .withPaginationType('full_numbers')
        .withBootstrap();
    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID').withClass('col-md-1 text-left'),
        DTColumnBuilder.newColumn('firstName').withTitle('First name'),
        DTColumnBuilder.newColumn('lastName').withTitle('Last name'),//.notVisible()
        DTColumnBuilder.newColumn(null).withClass('col-md-1').notSortable().renderWith(actionHtml)
    ];

    $scope.message = 'asdasdas';
    $scope.edit = edit;
    $scope.delete = deleteRow;

    function edit(id) {
        console.log(id);
        $scope.message = 'You are trying to edit the row with ID: ' + id;
        // Edit some data and call server to make changes...
        // Then reload the data so that DT is refreshed
        //$scope.dtOptions.reloadData();
    }
    function deleteRow(id) {
        $scope.message = 'You are trying to remove the row with ID: ' + id;
        // Delete some data and call server to make changes...
        // Then reload the data so that DT is refreshed
        //$scope.dtOptions.reloadData();
    }
    function actionHtml(data) {
        console.log('1');
        return '<button class="btn btn-sm btn-primary" ng-click="edit(' + data.col0 + ')"><i class="fa fa-edit"></i></button> <button class="btn btn-sm btn-danger" ng-click="delete(' + data.col0 + ')"><i class="fa fa-trash-o"></i></button>';
    }
});

app.controller("AppsCtrl", function ($scope, DTOptionsBuilder, DTColumnBuilder) {
    $scope.message = 'asdasdas';
    $scope.edit = edit;
    $scope.delete = deleteRow;

    var vm = this;
    vm.dtOptions = DTOptionsBuilder
        //.fromSource('GetAppList')
        .newOptions()
        .withOption('ajax', {
            // Either you specify the AjaxDataProp here
            //dataSrc: 'data',
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
        DTColumnBuilder.newColumn('col2').withTitle('Url').withClass('col-md-2'),
        DTColumnBuilder.newColumn(null).withClass('col-md-1').notSortable().renderWith(actionHtml)
    ];
    function edit(id) {
        console.log(id);
        $scope.message = 'You are trying to edit the row with ID: ' + id;
        // Edit some data and call server to make changes...
        // Then reload the data so that DT is refreshed
        //$scope.dtOptions.reloadData();
    }
    function deleteRow(id) {
        $scope.message = 'You are trying to remove the row with ID: ' + id;
        // Delete some data and call server to make changes...
        // Then reload the data so that DT is refreshed
        //$scope.dtOptions.reloadData();
    }
    function actionHtml(data) {
        console.log(data);
        return '<button class="btn btn-sm btn-primary" ng-click="edit(' + data.col0 + ')"><i class="fa fa-edit"></i></button> <button class="btn btn-sm btn-danger" ng-click="delete(' + data.col0 + ')"><i class="fa fa-trash-o"></i></button>';
    }
});