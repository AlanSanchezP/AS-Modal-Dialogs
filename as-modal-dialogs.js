(function () {
    'use strict';

    function asModalDialogsCssClasses() {
        return {
            redButton: 'as-modal-red-button',
            blueButton: 'as-modal-blue-button',
            greenButton: 'as-modal-blue-button',
            smallButton: 'as-modal-small-button',
            mediumButton: 'as-modal-medium-button',
            bigButton: 'as-modal-big-button',
            noButton: 'as-modal-no-button',
            modalBox: 'as-modal-dialog-box',
            modalTitle: 'as-modal-title',
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
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                trigger: '='
            },
            link: function (scope) {
                scope.showModal = !scope.trigger;
            },
            template: '<span ng-transclude></span>'
        };
    }

    angular
        .module('asModalDialogs')
        .directive('asModalContainer', asModalContainer);
}());(function () {
    'use strict';

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
                okText: '@',
                noText: '@'
            },
            link: function (scope) {
                var css = asModalDialogsCss;
                $log.log(css);
                scope.sizeClass = '';
                scope.colorClass = '';
            },
            template: '<div class="{{sizeClass}} {{colorClass}}" style="display:{{display}}" ng-transclude ng-if="trigger"></div>'
        };
    }

    asModalDialog.$inject = ['asModalDialogsCss', '$log'];

    angular
        .module('asModalDialogs')
        .directive('asModalDialog', asModalDialog);
}());(function () {
    'use strict';

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
                var css = asModalDialogsCss;
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
            template: '<div class="{{sizeClass}} {{colorClass}}" style="display:{{display}}" ng-if="trigger">' +
                        '<a ng-click="showModal()" class="">ss</a>' +
                        '</div>'
        };
    }

    asModalTrigger.$inject = ['asModalDialogsCss'];

    angular
        .module('asModalDialogs')
        .directive('asModalTrigger', asModalTrigger);
}());