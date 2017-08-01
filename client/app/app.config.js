(function(){
  angular.module('appModule').
    config(['$urlRouterProvider', '$locationProvider', '$stateProvider',
      function config($urlRouterProvider, $locationProvider, $stateProvider) {
        $locationProvider.hashPrefix('!');

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('tokenizer', {
          url: '/authentication/:token/:userId',
          template: 'Ingresando...',
          controllerAs: '$ctrl',
          controller: 'TokenController'
        });

        $stateProvider.state('login', {
          url: '/?credentials',
          templateUrl: 'login.html',
          controller: function($scope, $stateParams, $sanitize){
            var auth_message = $stateParams.credentials;
            var message;
            switch(auth_message){
              case 'missing':
                message = 'Debes ingresar usuario y contraseña válidos.';
                break;
              case 'incorrect':
                message = 'Contraseña incorrecta, por favor intenta otra vez.';
                break;
              default:
                message = '';
            }

            $scope.credentialsMessage = message;

            $scope.email = '';
            $scope.password = '';

            $scope.loginSubmit = function(){
              $scope.email = $sanitize($scope.email).toLowerCase();
              $scope.password = $sanitize($scope.password);
            };
          }
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

        $stateProvider.state('app.estudio', {
          url: '/estudio/',
          template: '<estudio></estudio>'
        });

        $stateProvider.state('app.home', {
          url: '/home/',
          template: '<home></home>'
        });

      }
    ]).run(function ($rootScope, $state, authClientService, $mdDialog) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        var condition = !$rootScope.isAuth && toState.name !== 'login' && toState.name !== 'tokenizer';
        if (condition){
          authClientService.attempRefresh();
        }
      });

      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
        $mdDialog.cancel();
      });

    });

})();

