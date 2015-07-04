(function () {
    'use strict';

    /*jslint unparam: true*/
    function asModalTrigger(asModalDialogsCss, $log) {
        return {
            restrict: 'E',
            require: '^asModalContainer',
            transclude: true,
            scope: {
                size: '@',
                color: '@',
                display: '@'
            },
            link: function (scope, elem, attrs, ctrl) {
                var parent, css;
                css = asModalDialogsCss();
                parent = scope.$parent.$parent;
                scope.showTrigger = parent.trigger;
                scope.showModal = parent.showModal;
                scope.buttonStyle = css.button;
                scope.sizeClass = '';
                scope.colorClass = '';
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
                // case 'medium':
                default:
                    scope.sizeClass = css.mediumButton;
                }
                switch (scope.color) {
                case 'green':
                    scope.colorClass = css.greenButton;
                    break;
                case 'red':
                    scope.colorClass = css.redButton;
                    break;
                // case 'blue':
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

    asModalTrigger.$inject = ['asModalDialogsCss', '$log'];

    angular
        .module('asModalDialogs')
        .directive('asModalTrigger', asModalTrigger);
}());