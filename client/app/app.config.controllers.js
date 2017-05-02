(function(){
  angular.module('appModule').
    controller('TokenController', ['$stateParams', 'authClientService',
      function ($stateParams, authClientService) {
        var self = this;
        self.token = $stateParams.token;
        self.userId = $stateParams.userId;

        console.log(self.token);
        console.log(self.userId);

        if(self.token === 'no_auth'){
          authClientService.logout();
        }

        authClientService.login();
        
      }
    ]);
})();

