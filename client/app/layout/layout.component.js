(function(){
  angular.module('appModule').component('layout', {
    templateUrl: 'app/layout/layout.component.html',
    controller: function LayoutController($scope, $mdMedia, $mdSidenav, $mdBottomSheet, $state){
      var self = this;

      $scope.$watch(function() { return $mdMedia('gt-xs'); }, function(mediaTrue) {
        self.bigScreen = mediaTrue;
      });

      self.openLeftMenu = function() {
        $mdSidenav('left-sidenav').toggle();
      };

      self.showBottomSheet = function() {
        $mdBottomSheet.show({
          templateUrl: 'app/layout/bottom-sheet/bottom-sheet.template.html',
          controller: function($scope){
            
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
