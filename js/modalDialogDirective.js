(function () {
    'use strict';

    /*jslint unparam: true*/
    function asModalDialog(asModalDialogsCss, $log) {
        return {
            restrict: 'E',
            require: '^asModalContainer',
            transclude: true,
            scope: {
                type: '@',
                acceptColor: '@',
                mode: '@',
                title: '@',
                action: '@',
                acceptText: '@',
                cancelText: '@'
            },
            link: function (scope, elem, attrs, ctrl) {
                var parent, css;
                parent = scope.$parent.$parent;
                css = asModalDialogsCss();

                scope.shadowClass = css.shadow;
                scope.containerClass = css.modalBox;
                scope.contentClass = css.modalContent;

                scope.buttonClass = css.button;
                scope.sizeClass = css.mediumButton;
                scope.cancelColor = css.redButton;
                scope.colorClass = '';

                switch (scope.acceptColor) {
                case 'green':
                    scope.colorClass = css.greenButton;
                    break;
                default:
                    scope.colorClass = css.blueButton;
                    break;
                }

                scope.modalVisible = !parent.modalVisible;
                scope.showModal = parent.showModal;

                scope.okAction = scope.action === undefined ? 'hide': scope.action;
                scope.okText = scope.acceptText === undefined ? 'Ok' : scope.acceptText;
                scope.noText = scope.cancelText === undefined ? 'Cancel' : scope.cancelText;
                scope.okMode = scope.mode === undefined ? 'link' : scope.mode;
            },
            template: '<div class="{{shadowClass}}" ng-show="modalVisible">' +
                        '<div class="{{containerClass}}">' +
                        '<h3 ng-bind="title"></h3>' +
                        '<div class="{{contentClass}}" ng-transclude></div>' +
                        '<a class="{{buttonClass}} {{sizeClass}} {{colorClass}}" ng-if="okMode == \'link\' && okAction == \'hide\'" ng-click="showModal()" ng-bind="okText" ></a>' +
                        '<a class="{{buttonClass}} {{sizeClass}} {{colorClass}}" ng-if="okMode == \'link\' && okAction != \'hide\'" ng-href="{{okAction}}" ng-bind="okText" ></a>' +
                        '<button type="submit" class="{{buttonClass}} {{sizeClass}} {{colorClass}}" ng-if="okMode == \'submit\'" ng-bind="okText"></a>' +
                        '<a class="{{buttonClass}} {{sizeClass}} {{cancelColor}}" ng-if="type == \'desition\'" ng-bind="noText"></a>' +
                        '</div>' +
                        '</div>'
        };
    }
    /*jslint unparam: false*/
    asModalDialog.$inject = ['asModalDialogsCss', '$log'];

    angular
        .module('asModalDialogs')
        .directive('asModalDialog', asModalDialog);
}());