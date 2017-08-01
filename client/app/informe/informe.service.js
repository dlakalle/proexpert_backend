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
        return undefined;
      }

    }

    function getEncuesta(){
      var token = store.get('token');
      var userId = store.get('userId');

      if(!!token && !!userId){
        return $http({
          method: 'POST',
          url: '/user/encuesta',
          data: {
            token: store.get('token')
          }
        });
      }
      else{
        return undefined;
      }
    }

    function getGlobalStats(){
      var token = store.get('token');
      var userId = store.get('userId');

      if(!!token && !!userId){
        return $http({
          method: 'POST',
          url: '/user/global',
          data: {
            token: store.get('token')
          }
        });
      }
      else{
        return undefined;
      }
    }

    return {
      getInforme: getInforme,
      getEncuesta: getEncuesta,
      getGlobalStats: getGlobalStats
    };

  });
})();
