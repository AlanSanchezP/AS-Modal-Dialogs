(function () {
    'use strict';

    function asModalDialog(asModalDialogsCss) {
        return {
            restrict: 'E',
            require: '^asModalContainer',
            transclude: true,
            scope: {
                type: '@',
                acceptColor: '@',
                mode: '@',
                action: '@',
                title: '@',
                acceptText: '@',
                cancelText: '@'
            },
            link: function (scope) {
                // Get asModalContainer $scope and cssClasses object
                var parent, css;
                parent = scope.$parent.$parent;
                css = asModalDialogsCss();

                // Set modal dialog css classes
                scope.shadowClass = css.shadow;
                scope.containerClass = css.modalBox;
                scope.contentClass = css.modalContent;

                // Set buttons format and size
                scope.buttonClass = css.button;
                scope.sizeClass = css.mediumButton;
                // Creates a new scope attribute to use in template
                scope.colorClass = '';

                // Set accept button color
                switch (scope.acceptColor) {
                case 'green':
                    scope.colorClass = css.greenButton;
                    break;
                case 'red':
                    scope.colorClass = css.redButton;
                    break;
                default:
                    scope.colorClass = css.blueButton;
                    break;
                }
                // Set cancel button color
                scope.cancelColor = scope.acceptColor === 'red' ? css.blueButton : css.redButton;

                // Call asModalContainer $scope properties
                scope.modalVisible = function () {
                    return parent.modalVisible;
                };
                scope.showModal = function () {
                    parent.showModal();
                };

                // Set okMode default value
                switch (scope.type) {
                case 'desition':
                    scope.okMode = 'link';
                    scope.action = scope.action === undefined ? '/' : scope.action;
                    break;
                default:
                    scope.okMode = 'hide';
                    break;
                }

                // Set okMode value if is specified in directive
                scope.okMode = scope.mode !== undefined ? scope.mode : scope.okMode;

                // Set buttons text
                scope.okText = scope.acceptText === undefined ? 'Ok' : scope.acceptText;
                scope.noText = scope.cancelText === undefined ? 'Cancel' : scope.cancelText;
            },
            template: '<div class="{{shadowClass}}" ng-show="modalVisible()">' +
                        '<div class="{{containerClass}}">' +
                        '<h3 ng-bind="title"></h3>' +
                        '<div class="{{contentClass}}" ng-transclude></div>' +
                        // Set a simple call to showModal() if the okMode is 'hide' 
                        '<a class="{{buttonClass}} {{sizeClass}} {{colorClass}}" ng-if="okMode == \'hide\'" ng-click="showModal()" ng-bind="okText"></a>' +
                        // Set the ng-href directive if okMode is 'link'
                        '<a class="{{buttonClass}} {{sizeClass}} {{colorClass}}" ng-if="okMode == \'link\'" ng-href="{{okAction}}" ng-bind="okText"></a>' +
                        // Set a submit button if okMode is 'submit'
                        '<button type="submit" class="{{buttonClass}} {{sizeClass}} {{colorClass}}" ng-if="okMode == \'submit\'" ng-bind="okText"></button>' +
                        // Set a cancel button if type is 'desition' that just hide the modal
                        '<a class="{{buttonClass}} {{sizeClass}} {{cancelColor}}" ng-if="type == \'desition\'" ng-bind="noText" ng-click="showModal()"></a>' +
                        '</div>' +
                        '</div>'
        };
    }

    asModalDialog.$inject = ['asModalDialogsCss'];

    angular
        .module('asModalDialogs')
        .directive('asModalDialog', asModalDialog);
}());