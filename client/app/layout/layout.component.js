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
        $mdDialog,
        $timeout,
        $window
      ){

      var self = this;

      self.buttonText = '';

      $scope.$watch(function() { return $mdMedia('(min-width: 1300px)'); }, function(mediaTrue) {
        self.bigScreen = mediaTrue;
        self.isScrollable();
      });

      self.openLeftMenu = function() {
        $mdSidenav('left-sidenav').toggle();
        self.isScrollable();
      };

      self.isScrollable = function(){
        self.sideNavIsOpen = $mdSidenav('left-sidenav').isOpen();

        if(!self.bigScreen && self.sideNavIsOpen){
          angular.element(document).find('body').css('overflow', 'hidden');
          angular.element(document).find('body').css('height', '100%');
          angular.element(document).find('body').css('position', 'fixed');
        }
        else{
          angular.element(document).find('body').removeAttr('style');
        }
      };

      self.redirectToContacto = function(){
        $window.open('http://conexioningenieros.com/contact/', '_blank');
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

        $timeout(function () {
          $mdSidenav('left-sidenav').onClose(function(){
            angular.element(document).find('body').removeAttr('style');
          });
        });

      };


      self.showBottomSheet = function() {
        $mdBottomSheet.show({
          templateUrl: 'app/layout/bottom-sheet/bottom-sheet.template.html',
          controller: function($scope){

            $scope.buttonCallback = self.buttonCallback;
            $scope.buttonText = self.buttonText;
            $scope.goHome = self.goHome;
            $scope.goEstudio = self.goEstudio;
            $scope.redirectToContacto = self.redirectToContacto;
            $scope.changePassword = self.changePassword;

          }
        }).then(function(clickedItem) {
          console.log(clickedItem);
        });
      };

      self.goHome = function(){
        $state.go('app.home'); 
      };

      self.goEstudio = function(){
        $state.go('app.estudio'); 
      };

      self.sideNavClick = function(logText){
        // console.log('app.' + logText);
        if(logText === 'descarga'){
          window.print();
        }
        else{
          $state.go('app.' + logText);
          $mdSidenav('left-sidenav').close();
        }
      };

      self.sideNavClickScroll = function(logText){
        // console.log('app.' + logText);
        $location.hash(logText);
        $mdSidenav('left-sidenav').close();
        $anchorScroll();
      };

      self.comingSoon = function($event, feature){
        self.showAlert($event, '', 'Esta funcionalidad no se encuentra disponible aún. Pronto podrás acceder a este y a otros contenidos.');
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
                $mdDialog.hide();
                self.showAlert(null, 'Cambio Contraseña', 'Operación Exitosa. Debes iniciar sesión nuevamente.');
                $timeout(function(){
                  $window.location.reload();
                }, 1500);
              }, function errorCallback(error){
                self.showAlert(null, 'Cambio Contraseña', 'Hubo un error en la operación, intente nuevamente.');
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

      self.showAlert = function(ev, title, message) {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title(title)
            .textContent(message)
            .ariaLabel('Notification')
            .ok('ACEPTAR')
            .targetEvent(ev)
        );
      };


    }
  });
})();
