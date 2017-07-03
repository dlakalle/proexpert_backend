(function(){
  angular.module('appModule').component('tarjeta', {
    templateUrl: 'app/indicadores/tarjeta.component.html',
    bindings: {
    	config: '<'
    },
    controller: function TarjetaController(){
      var self = this;
      
      self.$onInit = function(){
      	if(self.config.percent <= 33){
          self.pass = "close";
          self.passColor = "#EF5350";
          self.passClass = "fa-times";
        }
        else if(self.config.percent <= 66){
          self.pass = "check";
          self.passColor = "#E2B512";
          self.passClass = "fa-times";
        }
        else {
          self.pass = "check";
          self.passColor = "#77B346";
          self.passClass = "fa-check";
        }
      };
    }
  });
})();
