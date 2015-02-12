var app = angular.module("AppsList", ["datatables", 'datatables.bootstrap', 'ui.bootstrap', 'toaster', 'ngCookies']);
app.controller("AppsCtrl", function ($cookieStore, $scope, $compile, $http, DTOptionsBuilder, DTColumnBuilder, DTInstances, $modal) {
    //$cookieStore.put('__RequestVerificationToken', angular.element("input[name='__RequestVerificationToken']").val());
    $scope.create = function () {
        var modalInstance = $modal.open({
            templateUrl: 'Create',
            controller: 'createAppCtrl',
            resolve: {
                vm: function () { return vm; }
            }
        });
    };
    function edit(id) {
        $http.get('/api/tblApps/' + id).success(function (data) {
            $modal.open({
                templateUrl: 'Edit',
                controller: 'editAppCtrl',
                resolve: {
                    data: function () { return data; },
                    vm: function () { return vm; }
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
                resolve: {
                    data: function () { return data; },
                    vm: function () { return vm; }
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
        DTColumnBuilder.newColumn('col1').withTitle('Name of Application').withClass('col-md-8'),
        DTColumnBuilder.newColumn('col2').withTitle('Url').withClass('col-md-2'),
        DTColumnBuilder.newColumn(null).withClass('col-md-1 text-center').notSortable().renderWith(actionHtml)
    ];
    DTInstances.getLast().then(function (dtInstance) {
        vm.dtInstance = dtInstance;
    });
    $scope.edit = edit;
    $scope.delete = deleteRow;
    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
    }

    function actionHtml(data) {
        return '<button class="btn btn-sm btn-primary" ng-click="edit(' + data.col0 + ')"><i class="fa fa-edit"></i></button> <button class="btn btn-sm btn-danger" ng-click="delete(' + data.col0 + ')"><i class="fa fa-trash-o"></i></button>';
    }
});

app.controller('createAppCtrl', function ($scope, $http, $modalInstance, toaster, vm) {
    //var config = getHttpConfig();
    //console.log(config);
    //console.log($cookieStore);
    console.log($scope.antiForgeryToken);
    $scope.submit = function () {
        //$http.post('/api/tblApps/', this.tblApp, config)
        $http({
            method: 'POST',
            url: '/api/tblApps/',
            data: this.tblApp,
            headers: {
                'RequestVerificationToken': $scope.antiForgeryToken
            }
        }).success(function (data) {
            vm.dtInstance._renderer.reloadData();
            $modalInstance.close();
            toaster.pop('success', "Saved", "A new app " + $scope.tblApp.Id + " has been added");
        }).error(function (data) {
            toaster.pop('error', "Delete", "An Error has occured while Adding Customer! " + data);
        });
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

app.controller('editAppCtrl', function ($scope, $http, $modalInstance, data, toaster, vm) {
    $scope.tblApp = data;
    $scope.submit = function () {
        $http.put('/api/tblApps/' + this.tblApp.Id, this.tblApp).success(function (data) {
            vm.dtInstance._renderer.reloadData();
            $modalInstance.close();
            toaster.pop('info', "Saved", "The App " + $scope.tblApp.Id + " has been edited");
        }).error(function (data) {
            toaster.pop('error', "Delete", "An Error has occured while Adding Customer! " + data);
        });
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
app.controller('delAppCtrl', function ($scope, $modalInstance, data, $modal, vm) {
    $scope.tblApp = data;
    $scope.submit = function () {
        $modal.open({
            templateUrl: 'DelConfirm',
            controller: 'delConfirmCtrl',
            resolve: {
                id: function () { return data.Id; },
                vm: function () { return vm; }
            }
        });
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
app.controller('delConfirmCtrl', function ($scope, $http, $modalInstance, id, $modalStack, toaster, vm) {
    $scope.delete = function () {
        $http.delete('/api/tblApps/' + id).success(function (data) {
            vm.dtInstance._renderer.reloadData();
            $modalStack.dismissAll();
            toaster.pop('error', "Delete", "An application " + id + " has been deleted!");
        }).error(function (data) {
            toaster.pop('error', "Delete", "An Error has occured while Adding Customer! " + data);
        });
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

//app.directive('ncgRequestVerificationToken', function ($http) {
//    return function (scope, element, attrs) {
//        console.log(scope);
//        console.log(element);
//        console.log(attrs);
//        $http.defaults.headers.common['RequestVerificationToken'] = attrs.ncgRequestVerificationToken || 'no request verification token';
//    };
//});
//app.directive('ncgRequestVerificationToken', ['$http', function ($http) {
//    return function (scope, element, attrs) {
//        $http.defaults.headers.common['RequestVerificationToken'] = attrs.ncgRequestVerificationToken || "no request verification token";
//    };
//}]);
//function getHttpConfig() {
//    var token = angular.element("input#antiForgeryToken").val();
//    var config = {
//        headers: {
//            '__RequestVerificationToken': token
//        }
//    };
//    return config;
//}