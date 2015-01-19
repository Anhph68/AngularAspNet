app.controller("mainCtrl", function($scope) {
    $scope.sortType = "name"; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.searchQuery = ""; // set the default search/filter term

    // create the list of sushi rolls
    $scope.items = [
        { name: "Cali Roll", fish: "Crab", tastiness: 2 },
        { name: "Philly", fish: "Tuna", tastiness: 4 },
        { name: "Tiger", fish: "Eel", tastiness: 7 },
        { name: "Rainbow", fish: "Variety", tastiness: 6 }
    ];
});