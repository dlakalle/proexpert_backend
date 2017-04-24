(function(){
  angular.module('appModule').
    controller('TokenController', ['$rootScope', '$state', '$stateParams', '$window', 'store',
      function ($rootScope, $state, $stateParams, $window, store) {
        var self = this;
        self.token = $stateParams.token;
        self.userId = $stateParams.userId;

        console.log(self.token);
        console.log(self.userId);

        if(self.token === 'no_auth'){
          logout();
        }

        $rootScope.$on('unauthenticated', logout);

        login();

        function logout(){
          store.remove('token');
          store.remove('userId');
          $rootScope.isAuth = false;
          $window.location.href = '/login';
        }

        function login(){
          store.set('token', self.token);
          store.set('userId', self.userId);
          $rootScope.isAuth = true;
          $state.go('app.informe');
        }
      }
    ]);
})();

