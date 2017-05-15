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

    function login(token, userId){
      store.set('token', token);
      store.set('userId', userId);
      $rootScope.isAuth = true;
      $state.go('app.informe');
    }

    return {
      login: login,
      logout: logout
    };

  });
})();