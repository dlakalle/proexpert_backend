(function(){
  angular.module('appModule')
  .service('informeService', function (
    $rootScope, 
    $state, 
    $stateParams, 
    $window, 
    store,
    $http,
    authClientService
  ){

    function getInforme(){
      var token = store.get('token');
      var userId = store.get('userId');

      if(!!token && !!userId){
        return $http({
          method: 'POST',
          url: '/user/informe',
          data: {
            token: store.get('token')
          }
        });
      }
      else{
        console.log('informe: no token or user')
        return undefined;
      }

    }

    return {
      getInforme: getInforme
    };

  });
})();