angular.module('myApp', [])
.controller('myCtrl', function($scope) {
    $scope.mealDetails = {};
    $scope.customerCharges = {};
    $scope.earningsInfo = {};

    $scope.submit = function() {
        $scope.customerCharges.subtotal = ($scope.mealDetails.baseMealPrice * (100 + $scope.mealDetails.taxRate)) / 100;
        $scope.customerCharges.tip = ($scope.customerCharges.subtotal * $scope.mealDetails.tipPercentage) / 100;
        $scope.customerCharges.total = $scope.customerCharges.subtotal + $scope.customerCharges.tip;

        $scope.earningsInfo.tipTotal = ($scope.earningsInfo.tipTotal || 0.00) + $scope.customerCharges.tip;
        $scope.earningsInfo.mealCount = ($scope.earningsInfo.mealCount || 0) + 1;
        $scope.earningsInfo.avgTip = ($scope.earningsInfo.tipTotal || 0) / ($scope.earningsInfo.mealCount || 1);
    };

    $scope.clearInput = function() {
        $scope.mealDetails = {};
    };

    $scope.reset = function() {
        $scope.mealDetails = {};
        $scope.customerCharges = {};
        $scope.earningsInfo = {};
    };

});