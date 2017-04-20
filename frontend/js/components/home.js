'use strict';

angular.module('app')

  .component('home', {

    templateUrl: '/views/home.html',

    controller: function ($log) {
      'ngInject';

      this.$onInit = () => {
        $log.info('home component loaded');
      };
    }
  });