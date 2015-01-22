var app = angular.module("myApp", ["ui.router", "datatables", 'angular-loading-bar', 'ui.bootstrap']);
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

app.controller("loadJsonCtrl", function ($scope, $compile, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder
        .fromSource('../../Scripts/apps/data.json')
        .withPaginationType('full_numbers')
        .withOption('createdRow', createdRow)
        .withBootstrap();
    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID').withClass('col-md-1 text-center'),
        DTColumnBuilder.newColumn('firstName').withTitle('First name'),
        DTColumnBuilder.newColumn('lastName').withTitle('Last name'),//.notVisible()
        DTColumnBuilder.newColumn(null).withClass('col-md-1 text-center').notSortable().renderWith(actionHtml)
    ];

    $scope.message = '';
    $scope.edit = edit;
    $scope.delete = deleteRow;
    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
    }
    function edit(id) {
        $scope.message = 'You are trying to edit the row with ID: ' + id;
        //$scope.dtOptions.reloadData();
    }
    function deleteRow(id) {
        $scope.message = 'You are trying to remove the row with ID: ' + id;
        //$scope.dtOptions.reloadData();
    }
    function actionHtml(data) {
        return '<button class="btn btn-sm btn-primary" ng-click="edit(' + data.id + ')"><i class="fa fa-edit"></i></button> <button class="btn btn-sm btn-danger" ng-click="delete(' + data.id + ')"><i class="fa fa-trash-o"></i></button>';
    }
});
app.controller("AppsCtrl", function ($scope, $compile, DTOptionsBuilder, DTColumnBuilder, $modal) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder
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
        .withOption('createdRow', createdRow)
        .withPaginationType('full_numbers')
        .withBootstrap();
    vm.dtColumns = [
        DTColumnBuilder.newColumn('col0').withTitle('Id').withClass('col-md-1 text-center'),
        DTColumnBuilder.newColumn('col1').withTitle('Name of Application'),
        DTColumnBuilder.newColumn('col2').withTitle('Url').withClass('col-md-2'),
        DTColumnBuilder.newColumn(null).withClass('col-md-1 text-center').notSortable().renderWith(actionHtml)
    ];
    $scope.message = '';
    $scope.edit = edit;
    $scope.delete = deleteRow;
    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
    }
    function edit(id) {
        //$scope.message = 'You are trying to edit the row with ID: ' + id;
        var modalInstance = $modal.open({
            templateUrl: 'Modal',
            controller: 'ModalCtrl'
        });
        //$scope.dtOptions.reloadData();
    }
    function deleteRow(id) {
        var modalInstance = $modal.open({
            templateUrl: 'Modal',
            controller: 'ModalCtrl'
            //resolve: {
            //    items: function () {
            //        return $scope.items;
            //    }
            //}
        });
    }
    function actionHtml(data) {
        console.log(data);
        return '<button class="btn btn-sm btn-primary" ng-click="edit(' + data.col0 + ')"><i class="fa fa-edit"></i></button> <button class="btn btn-sm btn-danger" ng-click="delete(' + data.col0 + ')"><i class="fa fa-trash-o"></i></button>';
    }
});

app.controller('ModalCtrl', function ($scope, $modalInstance) {

    //$scope.items = items;
    //$scope.selected = {
    //    item: $scope.items[0]
    //};

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});