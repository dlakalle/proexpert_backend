(function(){
  angular.module('appModule').component('layout', {
    templateUrl: 'app/layout/layout.component.html',
    controller: function LayoutController($scope, $rootScope, $mdMedia, $mdSidenav, $mdBottomSheet, $state){
      var self = this;

      self.buttonText = '';

      $scope.$watch(function() { return $mdMedia('gt-xs'); }, function(mediaTrue) {
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
        }
        
        self.buttonCallback = function(){
          $rootScope.$broadcast('unauthenticated');
        };
      };


      self.showBottomSheet = function() {
        $mdBottomSheet.show({
          templateUrl: 'app/layout/bottom-sheet/bottom-sheet.template.html',
          controller: function($scope){

            $scope.buttonCallback = self.buttonCallback;
            $scope.buttonText = self.buttonText;

          }
        }).then(function(clickedItem) {
          console.log(clickedItem);
        });
      };

      self.sideNavClick = function(logText){
        console.log('app.' + logText);
        $state.go('app.' + logText);
      };
    }
  });
})();
