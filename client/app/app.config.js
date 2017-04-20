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
          url: '/app',
          template: '<layout></layout>'
        });

        $stateProvider.state('app.informe', {
          url: '/informe/',
          template: '<informe></informe>'
        });

        $stateProvider.state('app.descarga', {
          url: '/descarga/',
          template: '<div>Reporte Descargable</div>'
        });

        $stateProvider.state('app.usuario', {
          url: '/usuario/',
          template: '<div>Mi Cuenta</div>'
        });

      }
    ]);

})();
