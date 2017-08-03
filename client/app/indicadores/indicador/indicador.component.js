(function(){
  angular.module('appModule').component('indicador', {
    templateUrl: 'app/indicadores/indicador/indicador.component.html',
    bindings: {
    	value: '<',
    	iconClass: '<'
    },
    controller: function IndicadorController(){
      var self = this;
      self.$onInit = function(){
        if(self.iconClass === 'fa-graduation-cap'){
          self.field = 'Carrera';
        }
        else{
          self.field = 'Cargo';
        }
      }
    }
  });
})();
