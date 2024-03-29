(function () {
    'use strict';

    function asModalContainer() {
        function asModalContainerController($scope) {
            // If there is a trigger, the modal is initially hidden
            // If not, the modal is initially visible
            $scope.modalVisible = !$scope.trigger;
            // Simple function to show/hide the modal
            $scope.showModal = function () {
                $scope.modalVisible = !$scope.modalVisible;
            };
        }

        asModalContainerController.$inject = ['$scope'];

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                trigger: '='
            },
            controller: asModalContainerController,
            // Set the directive as a inline tag to prevent design problems
            template: '<span ng-transclude></span>'
        };
    }

    angular
        .module('asModalDialogs')
        .directive('asModalContainer', asModalContainer);
}());