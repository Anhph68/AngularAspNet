var app = angular.module("AppsList", ["datatables", 'ui.bootstrap']);

app.controller("AppsCtrl", function ($scope, $compile, $http, DTOptionsBuilder, DTColumnBuilder, $modal) {
    $scope.create = function () {
        $modal.open({
            templateUrl: 'Apps/Create',
            controller: 'createAppCtrl'
        });
    };

    function edit(id) {
        $http.get('/api/tblApps/' + id).success(function (data) {
            console.log(data);
            $modal.open({
                templateUrl: 'Apps/Edit',
                controller: 'editAppCtrl',
                resolve: {
                    data: function() {
                        return data;
                    }
                }
            });
        }).error(function (data) {
            $scope.error = "An Error has occured while Saving customer! " + data;
        });
        //$scope.dtOptions.reloadData();
    }

    var vm = this;
    vm.dtOptions = DTOptionsBuilder
        .newOptions()
        .withOption('ajax', {
            url: 'Basic/GetAppList',
            type: 'POST'
        })
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
    $scope.edit = edit;
    $scope.delete = deleteRow;
    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
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

app.controller('createAppCtrl', function ($scope, $http, $modalInstance) {
    $scope.submit = function () {
        console.log($scope.tblApp);
        //$modalInstance.close();
        $http.post('/api/tblApps/', this.tblApp).success(function (data) {
            alert("Added Successfully!!");
            console.log(data);
        }).error(function (data) {
            $scope.error = "An Error has occured while Adding Customer! " + data;
        });
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

app.controller('editAppCtrl', function ($scope, $http, $modalInstance, data) {
    console.log(data);
    console.log($scope.$parent.dtOptions);
    $scope.tblApp = data;
    $scope.submit = function () {
        console.log($scope.tblApp);
        //$modalInstance.close();
        $http.put('/api/tblApps/' + this.tblApp.Id, this.tblApp).success(function (data) {
            alert("Added Successfully!!");
            console.log(data);
        }).error(function (data) {
            $scope.error = "An Error has occured while Adding Customer! " + data;
        });
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});