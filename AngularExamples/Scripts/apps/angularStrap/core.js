var app = angular.module('myApp', ['ngSanitize', 'ngAnimate', 'mgcrea.ngStrap']);
//'use strict';
app.config(function ($modalProvider) {
    angular.extend($modalProvider.defaults, {
        animation: 'am-fade'
    });
}).config(function ($datepickerProvider) {
    angular.extend($datepickerProvider.defaults, {
        dateFormat: 'dd/MM/yyyy',
        startWeek: 1,
        autoclose: true,
    });
})

app.controller('modalCtrl', function ($scope, $modal) {
    $scope.modal = { title: 'Title', content: "Hello Modal<br />This is a multiline message!" };

    // Controller usage example

    var myModal = $modal({ title: 'Title', content: 'Hello Modal<br />This is a multiline message!', show: true });
    $scope.showModal = function () {
        myModal.$promise.then(myModal.show);
    };
    $scope.hideModal = function () {
        myModal.$promise.then(myModal.hide);
    };

    // Show a basic modal from a controller
    //var myModal = $modal({ title: 'My Title', content: 'My Content', show: true });
    // Pre-fetch an external template populated with a custom scope
    //var myOtherModal = $modal({ scope: $scope, template: 'modal/docs/modal.tpl.demo.html', show: false });
    // Show when some event occurs (use $promise property to ensure the template has been loaded)
    $scope.showModal = function () {
        myOtherModal.$promise.then(myOtherModal.show);
    };
});

app.controller('datepickerCtrl', function ($scope) {
    $scope.selectedDate = new Date();
    $scope.selectedDateAsNumber = Date.UTC(1986, 1, 22);
    // $scope.fromDate = new Date();
    // $scope.untilDate = new Date();
    $scope.getType = function (key) {
        return Object.prototype.toString.call($scope[key]);
    };

    $scope.clearDates = function () {
        $scope.selectedDate = null;
    };

});