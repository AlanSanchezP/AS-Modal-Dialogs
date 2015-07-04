(function () {
    'use strict';

    function asModalDialogsCssClasses() {
        return {
            button: 'as-modal-button',
            redButton: 'as-modal-red-button',
            blueButton: 'as-modal-blue-button',
            greenButton: 'as-modal-blue-button',
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
