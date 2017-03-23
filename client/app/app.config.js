(function(){
  angular.module('appModule').
    config(['$urlRouterProvider', '$locationProvider', '$stateProvider',
      function config($urlRouterProvider, $locationProvider, $stateProvider) {
        $locationProvider.hashPrefix('!');

        $urlRouterProvider.otherwise('/login/');

        $stateProvider.state('app', {
          url: '',
          template: '<app></app>'
        });
        
        $stateProvider.state('app.informe', {
          url: '/informe/',
          template: '<layout></layout>'
        });

        $stateProvider.state('login', {
          url: '/login/',
          template: '<login></login>'
        });


      }
    ]);

})();
