angular.module('app')

  .component('users', {

    templateUrl: '/views/users.html',

    bindings: {
      users: '<'
    },

    controller: function ($log) {

      this.$onInit = () => {
        $log.info('users component loaded');
      };

    }
  });