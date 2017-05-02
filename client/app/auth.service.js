(function(){
  angular.module('appModule')
  .service('authClientService', function (
    $rootScope, 
    $state, 
    $stateParams, 
    $window, 
    store
  ){
    function logout(){
      store.remove('token');
      store.remove('userId');
      $rootScope.isAuth = false;
      $state.go('login');
    }

    function login(){
      store.set('token', self.token);
      store.set('userId', self.userId);
      $rootScope.isAuth = true;
      $state.go('app.informe');
    }

    return {
      login: login,
      logout: logout
    };

  });
})();