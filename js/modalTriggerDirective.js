(function () {
    'use strict';

    /*jslint unparam: true*/
    function asModalTrigger(asModalDialogsCss) {
        return {
            restrict: 'E',
            require: '^asModalContainer',
            transclude: true,
            scope: {
                size: '@',
                color: '@',
                display: '@'
            },
            link: function (scope) {
                // Get asModalContainer $scope and cssClasses object
                var parent, css;
                css = asModalDialogsCss();
                parent = scope.$parent.$parent;

                // Set main properties
                scope.showTrigger = parent.trigger;
                scope.showModal = parent.showModal;

                // Set button class
                scope.buttonStyle = css.button;
                scope.sizeClass = '';
                scope.colorClass = '';

                // Set button size
                switch (scope.size) {
                case 'small':
                    scope.sizeClass = css.smallButton;
                    break;
                case 'big':
                    scope.sizeClass = css.bigButton;
                    break;
                case 'none':
                    scope.sizeClass = css.noButton;
                    break;
                default:
                    scope.sizeClass = css.mediumButton;
                }

                // Set button color
                switch (scope.color) {
                case 'green':
                    scope.colorClass = css.greenButton;
                    break;
                case 'red':
                    scope.colorClass = css.redButton;
                    break;
                default:
                    scope.colorClass = css.blueButton;
                }
            },
            template: '<div style="display:{{display}}" ng-if="showTrigger">' +
                        '<a ng-click="showModal()" class="{{buttonStyle}} {{sizeClass}} {{colorClass}}" ng-transclude></a>' +
                        '</div>'
        };
    }
    /*jslint unparam: false*/

    asModalTrigger.$inject = ['asModalDialogsCss'];

    angular
        .module('asModalDialogs')
        .directive('asModalTrigger', asModalTrigger);
}());