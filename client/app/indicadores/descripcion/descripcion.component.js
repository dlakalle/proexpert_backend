(function(){
  angular.module('appModule').component('descripcion', {
    templateUrl: 'app/indicadores/descripcion/descripcion.component.html',
    bindings: {
    	text: '<'
    },
    controller: function DescripcionController(){
      var self = this;
      
    }
  });
})();
