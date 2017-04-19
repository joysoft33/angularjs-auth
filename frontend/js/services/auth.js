angular.module('app')

  .service('AuthService', function ($rootScope, $cookies, $q, $http, $window) {

    const API_URL = 'http://localhost:3000/users';
    const KEY = 'app-user';
    
    this.isAuthenticated = () => {
      var user = angular.fromJson($window.localStorage.getItem(KEY));
      return user && typeof user.id != 'undefined';
      //return $cookies.getObject(KEY) != null;
    };

    this.getCurrentUser = () => {
      return angular.fromJson($window.localStorage.getItem(KEY));
      //return $cookies.getObject(KEY);
    };

    this.getUserByEmail = (email) => {
      var defer = $q.defer();

      $http.get(API_URL + `?email=${email}`).then((response) => {
        if (response.data.length > 0) {
          defer.resolve(response.data);
        } else {
          defer.reject();
        }
      }).catch(() => {
        defer.reject();
      });

      return defer.promise;
    };

    this.createUser = (user) => {

      var defer = $q.defer();

      this.getUserByEmail(user.email).then(() => {
        defer.reject();
      }).catch(() => {
        $http.post(API_URL, user).then((response) => {
          $window.localStorage.setItem(KEY, angular.toJson(response.data));
          //$cookies.putObject(KEY, response.data);
          $rootScope.$emit('AUTH', true);
          defer.resolve();
        });
      });

      return defer.promise;
    };

    this.connect = (email, pwd) => {

      var defer = $q.defer();

      $http.get(API_URL + `?email=${email}&password=${pwd}`).then((response) => {
        if (response.data.length == 1) {
          $window.localStorage.setItem(KEY, angular.toJson(response.data[0]));
//          $cookies.putObject(KEY, response.data[0]);
          $rootScope.$emit('AUTH', true);
          defer.resolve();
        } else {
          defer.reject();
        }
      }).catch((response) => {
        defer.reject();
      });

      return defer.promise;
    };

    this.disconnect = () => {
      $window.localStorage.removeItem(KEY);
      //$cookies.remove(KEY);
      $rootScope.$emit('AUTH', false);
    }

  });