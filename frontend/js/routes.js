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
      .state('user', {
        url: '/user/:id',
        component: 'user',
        authenticate: true,
        resolve: {
          user: function (UsersService, $transition$) {
            return UsersService.getUser($transition$.params().id);
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