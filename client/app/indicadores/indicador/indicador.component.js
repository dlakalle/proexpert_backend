(function(){
  angular.module('appModule').component('indicador', {
    templateUrl: 'app/indicadores/indicador/indicador.component.html',
    bindings: {
    	value: '<',
    	iconClass: '<'
    },
    controller: function IndicadorController(){
      var self = this;
      console.log(self.iconClass);
    }
  });
})();
