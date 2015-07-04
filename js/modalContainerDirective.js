(function () {
    'use strict';

    function asModalContainer($log) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                trigger: '='
            },
            controller: function ($scope) {
                $scope.modalVisible = !$scope.trigger;
                $scope.showModal = function () {
                    $scope.modalVisible = !$scope.modalVisible;
                    $log.log($scope.modalVisible);
                };
            },
            template: '<span ng-transclude></span>'
        };
    }

    asModalContainer.$inject = ['$log'];

    angular
        .module('asModalDialogs')
        .directive('asModalContainer', asModalContainer);
}());