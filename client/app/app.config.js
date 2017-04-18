(function(){
  angular.module('appModule').
    config(['$urlRouterProvider', '$locationProvider', '$stateProvider',
      function config($urlRouterProvider, $locationProvider, $stateProvider) {
        $locationProvider.hashPrefix('!');

        $urlRouterProvider.otherwise('/no_auth/no_user');

        $stateProvider.state('tokenizer', {
          url: '/:token/:userId',
          template: 'Ingresando...',
          controllerAs: '$ctrl',
          controller: 'TokenController'
        });


        $stateProvider.state('app', {
          url: '/informe',
          template: '<layout></layout>'
        });

      }
    ]);

})();
