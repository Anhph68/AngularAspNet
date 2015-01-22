var app = angular.module('validationApp', []);
app.controller('mainCtrl', function ($scope) {
    $scope.user = {
        name: "Anh",
        username: "Anh",
        email: "Anh@mail.com"
    };
    $scope.submitForm = function (isValid) {
        console.log(isValid);
        if (isValid) {
            alert('Our form is amazing!');
        }
    };
});