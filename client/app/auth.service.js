(function(){
  angular.module('appModule')
  .service('authClientService', function (
    $rootScope, 
    $state, 
    $stateParams, 
    $window, 
    store,
    $http
  ){
    function logout(){
      store.remove('token');
      store.remove('userId');
      $rootScope.isAuth = false;
      $state.go('login');
    }

    function login(token, userId){
      store.set('token', token);
      store.set('userId', userId);
      $rootScope.isAuth = true;
      $state.go('app.informe');
    }

    function attempRefresh(){
      var token = store.get('token');
      var userId = store.get('userId');

      if(!!token && !!userId){
        isAuthenticated({
          token: token,
          userId: userId
        }).then(function successCallback(response){
          if(response.data.auth){
            $rootScope.isAuth = true;
          }
          else{
            logout();
          }
        }, function errorCallback(err){
          logout();
        });
      }
      else{
        logout();
      }
    }

    function isAuthenticated(args){
      return $http({
          method: 'POST',
          url: '/auth/valid',
          data: {
            token: args.token,
            userId: args.userId
          }
        });
    }

    return {
      login: login,
      logout: logout,
      isAuthenticated: isAuthenticated,
      attempRefresh: attempRefresh
    };

  });
})();
