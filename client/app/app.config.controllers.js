(function(){
  angular.module('appModule').
    controller('TokenController', ['$stateParams', 'authClientService',
      function ($stateParams, authClientService) {
        var self = this;
        self.token = $stateParams.token;
        self.userId = $stateParams.userId;

        authClientService.isAuthenticated({
          token: self.token,
          userId: self.userId
        }).then(function(response){
          
          if(response.data.auth){
            authClientService.login(self.token, self.userId);
          }
          else{
            authClientService.logout();
          }

        });

        
      }
    ]);
})();

