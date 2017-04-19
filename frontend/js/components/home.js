angular.module('app')

  .component('home', {

    templateUrl: '/views/home.html',

    controller: function ($log) {

      this.$onInit = () => {
        $log.info('home component loaded');
      };
    }
  });