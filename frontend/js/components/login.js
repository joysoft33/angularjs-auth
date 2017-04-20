'use strict';

angular.module('app')

  .component('login', {

    templateUrl: '/views/login.html',

    bindings: {
      redirect: '<'
    },

    controller: function (AuthService, $state) {
      'ngInject';

      this.$onInit = () => {
        this.errorMessage = '';
        this.user = {};
      };

      this.submit = (user) => {

        this.errorMessage = '';

        if (typeof user.name != 'undefined') {
          AuthService.createUser(user).then(() => {
            $state.go(this.redirect ? this.redirect : 'home');
          }).catch(() => {
            this.errorMessage = `Une erreur s'est produite`;
          });
        } else {
          AuthService.connect(user.email, user.password).then(() => {
            $state.go(this.redirect ? this.redirect : 'home');
          }).catch(() => {
            this.errorMessage = `Utilisateur introuvable ou mot de passe invalide`;
          });
        }
      };
    }
  });