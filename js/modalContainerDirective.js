(function () {
  'use strict';

  function asModalContainer() {
    return {
      restrict: 'E',
      transclude: false,
      scope: {
      	trigger: '='
      },
      link: function (scope, elem, attrs) {
        scope.showModal = !scope.trigger;
      }
    };
  }

  angular
    .module('asModalDialogs')
    .directive('asModalContainer', asModalContainer);
}());