(function(){
  angular.module('appModule').component('tarjeta', {
    templateUrl: 'app/indicadores/tarjeta.component.html',
    bindings: {
    	config: '<'
    },
    controller: function TarjetaController($mdDialog){
      var self = this;
      
      self.$onInit = function(){
      	if(self.config.percent <= 33){
          self.message = "En base a este resultado comparativo, te informamos que estás percibiendo un sueldo bajo el promedio de lo que se espera para tu carrera y/o cargo, por lo que te aconsejamos que busques oportunidades de mejora para potenciar tu carrera.";
          self.pass = "close";
          self.passColor = "#EF5350";
          self.passClass = "fa-times";
        }
        else if(self.config.percent <= 66){
          self.message = "En base a este resultado comparativo, te aconsejamos que";
          self.pass = "check";
          self.passColor = "#E2B512";
          self.passClass = "fa-times";
        }
        else {
          self.message = "En base a este resultado comparativo, te aconsejamos que";
          self.pass = "check";
          self.passColor = "#77B346";
          self.passClass = "fa-check";
        }
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
