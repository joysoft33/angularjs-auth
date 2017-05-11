'use strict';

angular.module('app')

  .component('user', {

    templateUrl: '/views/user.html',

    bindings: {
      user: '<'
    },

    controller: function ($log) {
      'ngInject';

      this.$onInit = () => {
        $log.info('user component loaded');
      };

    }
  });