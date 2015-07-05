(function () {
    'use strict';

    function asModalDialogsCssClasses() {
        return {
            button: 'as-modal-button',
            redButton: 'as-modal-red-button',
            blueButton: 'as-modal-blue-button',
            greenButton: 'as-modal-green-button',
            smallButton: 'as-modal-small-button',
            mediumButton: 'as-modal-medium-button',
            bigButton: 'as-modal-big-button',
            noButton: 'as-modal-no-button',
            shadow: 'as-modal-shadow',
            modalBox: 'as-modal-dialog-box',
            modalContent: 'as-modal-dialog-content'
        };
    }

    angular
        .module('asModalDialogs', [])
        .constant('asModalDialogsCss', asModalDialogsCssClasses);
}());
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
}());(function () {
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
                modalTitle: '@',
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

                // Set okMode and okAction default value
                scope.okAction = '';
                switch (scope.type) {
                case 'desition':
                    scope.okMode = 'link';
                    scope.okAction = scope.action === undefined ? '/' : scope.action;
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
                        '<h3 ng-bind="modalTitle"></h3>' +
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
}());(function () {
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