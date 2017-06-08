(function(){
  angular.module('appModule').component('layout', {
    templateUrl: 'app/layout/layout.component.html',
    controller: function LayoutController(
        $scope, 
        $rootScope, 
        $mdMedia, 
        $mdSidenav, 
        $mdBottomSheet, 
        $state,
        $location,
        $anchorScroll,
        authClientService,
        $mdDialog
      ){

      var self = this;

      self.buttonText = '';

      $scope.$watch(function() { return $mdMedia('(min-width: 900px)'); }, function(mediaTrue) {
        self.bigScreen = mediaTrue;
      });

      self.openLeftMenu = function() {
        $mdSidenav('left-sidenav').toggle();
      };



      self.$onInit = function(){
        
        if(!!$rootScope.isAuth){
          self.buttonText = 'Log Out';
        }
        else {
          self.buttonText = 'Log In';
          // $rootScope.$broadcast('unauthenticated');
        }

        self.buttonCallback = function(){
          authClientService.logout();
        };
      };


      self.showBottomSheet = function() {
        $mdBottomSheet.show({
          templateUrl: 'app/layout/bottom-sheet/bottom-sheet.template.html',
          controller: function($scope){

            $scope.buttonCallback = self.buttonCallback;
            $scope.buttonText = self.buttonText;

            $scope.changePassword = self.changePassword;

          }
        }).then(function(clickedItem) {
          console.log(clickedItem);
        });
      };

      self.sideNavClick = function(logText){
        console.log('app.' + logText);
        $state.go('app.' + logText);

        $mdSidenav('left-sidenav').close();
      };

      self.sideNavClickScroll = function(logText){
        console.log('app.' + logText);
        $location.hash(logText);
        $mdSidenav('left-sidenav').close();
        $anchorScroll();
      };

      self.changePassword = function($event){
        self.showDialog($event, {});
      };

      self.showDialog = function($event, locals){
        var config = {
          controller: function($scope){
            $scope.password = '';
            $scope.confirmation = '';
            $scope.oldPassword = '';
            $scope.cambiarPassword = function(){
              authClientService.changePassword({
                password: $scope.password,
                confirmation: $scope.confirmation,
                oldPassword: $scope.oldPassword
              }).then(function successCallback(response){
                console.log(response);
              }, function errorCallback(error){
                console.log('Error:', error);
              });
            }
          },
          templateUrl: 'app/usuario/cambiar-password.html',
          parent: angular.element(document.body),
          targetEvent: $event,
          clickOutsideToClose: true
        };

        config.locals = locals;

        $mdDialog.show(config);
      };

    }
  });
})();
