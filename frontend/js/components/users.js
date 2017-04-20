'use strict';

angular.module('app')

  .component('users', {

    templateUrl: '/views/users.html',

    bindings: {
      users: '<'
    },

    controller: function ($log) {
      'ngInject';

      this.$onInit = () => {
        $log.info('users component loaded');
      };

    }
  });