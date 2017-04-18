(function(){
  angular.module('appModule').component('layout', {
    templateUrl: 'app/informe/layout.component.html',
    controller: function LayoutController($mdSidenav){
      var self = this;
      self.openLeftMenu = function() {
        $mdSidenav('left-sidenav').toggle();
      };
    }
  });
})();
