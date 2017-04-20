'use strict';

angular.module('app')

  .config(function ($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider
      .state('home', {
        url: '/home',
        component: 'home'
      })
      .state('users', {
        url: '/users',
        component: 'users',
        authenticate: true,
        resolve: {
          users: function (UsersService) {
            return UsersService.getUsers();
          }
        }
      })
      .state('login', {
        url: '/login',
        component: 'login',
        resolve: {
          redirect: function ($state) {
            return $state.transition._targetState._params.redirect;
          }
        }
      });

    $urlRouterProvider.otherwise('/home');
  });