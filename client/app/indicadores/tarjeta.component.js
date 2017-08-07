(function(){
  angular.module('appModule').component('tarjeta', {
    templateUrl: 'app/indicadores/tarjeta.component.html',
    bindings: {
    	config: '<'
    },
    controller: function TarjetaController($mdDialog){
      var self = this;


      self.messageFail = "En base a este resultado comparativo, te informamos que estás percibiendo un sueldo MENOR al promedio de lo que se espera para tu carrera y/o cargo, te aconsejamos que busques oportunidades de mejora para potenciar tu carrera profesional.";
      self.messageRegular = "En base a este resultado comparativo, te informamos que estás percibiendo un sueldo CERCANO al promedio de lo que se espera para tu carrera y/o cargo, esto significa que estás en una posición cómoda en el corto plazo, pero tal vez ya es tiempo de que comiences a buscar otras estrategias para obtener una ventaja competitiva que te lleve al siguiente nivel.";
      self.messageSuccess = "En base a este resultado comparativo, te informamos que estás percibiendo un sueldo por SOBRE el promedio de lo que se espera para tu carrera y/o cargo, felicidades, ya que te encuentras en el top entre tus pares!!!. Tal vez es momento de pensar en un postgrado o en adquirir nuevas responsabilidades dentro de tu área, las que te entreguen un retorno a largo plazo.";
      self.messageMissing = "Te contactaremos tan pronto contemos con mayor información que pueda serte útil.";
      self.$onInit = function(){
        if(self.config.percent === ""){
          self.pass = "close";
          self.passColor = "#4DB6AC";
          self.passClass = "fa-question";
          self.config.percent = "¿?";
          self.message = self.messageMissing;
          self.config.description = "No hay suficientes datos para generar este reporte, ya que pocos ingenieros presentan un perfil similar al tuyo. Pronto te ofreceremos más información.";
        }
      	else if(self.config.percent <= 33){
          self.message = self.messageFail;
          self.pass = "close";
          self.passColor = "#EF5350";
          self.passClass = "fa-times";
        }
        else if(self.config.percent <= 66){
          self.message = self.messageRegular;
          self.pass = "check";
          self.passColor = "#E2B512";
          self.passClass = "fa-times";
        }
        else {
          self.message = self.messageSuccess;
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
