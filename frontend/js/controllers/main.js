'use strict';

angular.module('app')

  .controller('main', function (AuthService, $rootScope, $state) {
    'ngInject';

    this.isAuthenticated = AuthService.isAuthenticated();

    $rootScope.$on('AUTH', (event, connected) => {
      this.isAuthenticated = connected;
      if (!connected) {
        $state.go('home');
      }
    });

    this.disconnect = () => {
      AuthService.disconnect();
    };

  });