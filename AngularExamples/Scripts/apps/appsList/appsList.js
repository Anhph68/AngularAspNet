var app = angular.module("AppsList", ["datatables", 'ui.bootstrap', 'toaster']);
app.controller("AppsCtrl", function ($scope, $compile, $http, DTOptionsBuilder, DTColumnBuilder, $modal) {
    $scope.create = function () {
        var modalInstance = $modal.open({
            templateUrl: 'Create',
            controller: 'createAppCtrl',
            scope: $scope
        });

        modalInstance.result.then();
    };
    function edit(id) {
        $http.get('/api/tblApps/' + id).success(function (data) {
            $modal.open({
                templateUrl: 'Edit',
                controller: 'editAppCtrl',
                scope: $scope,
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });
        }).error(function (data) {
            $scope.error = "An Error has occured while Saving customer! " + data;
        });
    }
    function deleteRow(id) {
        $http.get('/api/tblApps/' + id).success(function (data) {
            $modal.open({
                templateUrl: 'Delete',
                controller: 'delAppCtrl',
                scope: $scope,
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });
        }).error(function (data) {
            $scope.error = "An Error has occured while Saving customer! " + data;
        });
    }
    var vm = this;
    vm.dtOptions = DTOptionsBuilder
        .newOptions()
        .withOption('ajax', {
            url: '../Basic/GetAppList',
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

    function actionHtml(data) {
        console.log(data);
        return '<button class="btn btn-sm btn-primary" ng-click="edit(' + data.col0 + ')"><i class="fa fa-edit"></i></button> <button class="btn btn-sm btn-danger" ng-click="delete(' + data.col0 + ')"><i class="fa fa-trash-o"></i></button>';
    }
});

app.controller('createAppCtrl', function ($scope, $http, $modalInstance, toaster) {
    $scope.submit = function () {
        console.log($scope.tblApp);
        $http.post('/api/tblApps/', this.tblApp).success(function (data) {
            $modalInstance.close($scope.$$prevSibling.dtOptions.reloadData());
            toaster.pop('success', "title", "text");
        }).error(function (data) {
            toaster.pop('danger', "title", "text");
        });
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

app.controller('editAppCtrl', function ($scope, $http, $modalInstance, data, toaster) {
    $scope.tblApp = data;
    $scope.submit = function () {
        $http.put('/api/tblApps/' + this.tblApp.Id, this.tblApp).success(function (data) {
            $modalInstance.close($scope.$$prevSibling.dtOptions.reloadData());
            toaster.pop('success', "title", "text");
        }).error(function (data) {
            $scope.error = "An Error has occured while Adding Customer! " + data;
        });
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
app.controller('delAppCtrl', function ($scope, $modalInstance, data, $modal) {
    $scope.tblApp = data;
    $scope.submit = function () {
        $modal.open({
            templateUrl: 'DelConfirm',
            controller: 'delConfirmCtrl',
            scope: $scope,
            resolve: {
                id: function () {
                    return data.Id;
                }
            }
        });
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
app.controller('delConfirmCtrl', function ($scope, $http, $modalInstance, id, $modalStack, toaster) {
    $scope.delete = function () {
        $http.delete('/api/tblApps/' + id).success(function (data) {
            $modalStack.dismissAll($scope.$$prevSibling.$parent.$$prevSibling.dtOptions.reloadData());
            toaster.pop('error', "Delete", "An application deleted!");
        }).error(function (data) {
            $scope.error = "An Error has occured while Adding Customer! " + data;
        });
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});