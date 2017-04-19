angular.module('app')

  .service('UsersService', function ($q, $http) {

    const API_URL = 'http://localhost:3000/users';
    
    this.getUsers = () => {
      var defer = $q.defer();

      $http.get(API_URL).then((response) => {
        defer.resolve(response.data);
      }).catch((response) => {
        defer.reject(response.statusText);
      });

      return defer.promise;
    };

  });