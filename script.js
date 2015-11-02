angular.module('myApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl : 'home.html',
            controller : 'HomeCtrl'
        }).when('/new-meal', {
            templateUrl : 'createMeal.html',
            controller : 'CreateMealCtrl'
        }).when('/my-earnings', {
            templateUrl : 'displayEarnings.html',
            controller : 'DisplayEarningsCtrl'
        }).when('/error', {
            template : '<p>Error - Page Not Found</p>'
        }).otherwise('/error');
    }])
    .controller('HomeCtrl', function($scope) {
       
    })
    .controller('CreateMealCtrl', function($scope, $rootScope) {

        $rootScope.showErrors = true;

        $rootScope.mealDetails = {};
        $rootScope.customerCharges = {};
        $rootScope.earningsInfo = {}; 

        $scope.submit = function() {
            $rootScope.showErrors = true;
            if ($scope.myForm.$valid) {
                $rootScope.customerCharges.subtotal = ($rootScope.mealDetails.baseMealPrice * (100 + $rootScope.mealDetails.taxRate)) / 100;
                $rootScope.customerCharges.tip = ($rootScope.customerCharges.subtotal * $rootScope.mealDetails.tipPercentage) / 100;
                $rootScope.customerCharges.total = $rootScope.customerCharges.subtotal + $rootScope.customerCharges.tip;

                $rootScope.earningsInfo.tipTotal = ($rootScope.earningsInfo.tipTotal || 0.00) + $rootScope.customerCharges.tip;
                $rootScope.earningsInfo.mealCount = ($rootScope.earningsInfo.mealCount || 0) + 1;
                $rootScope.earningsInfo.avgTip = ($rootScope.earningsInfo.tipTotal || 0) / ($rootScope.earningsInfo.mealCount || 1);            
            }
        };

        $scope.clearInput = function() {
            $rootScope.mealDetails = {};
            $rootScope.showErrors = false;
        };

    })
    .controller('DisplayEarningsCtrl', function($scope, $rootScope) {

        $scope.reset = function() {
            $rootScope.mealDetails = {};
            $rootScope.customerCharges = {};
            $rootScope.earningsInfo = {};
            $rootScope.showErrors = false;
        };
    });