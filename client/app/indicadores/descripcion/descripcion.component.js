(function(){
  angular.module('appModule').component('descripcion', {
    templateUrl: 'app/indicadores/descripcion/descripcion.component.html',
    bindings: {
    	text: '<'
    },
    controller: function DescripcionController(){
      var self = this;
      self.$onInit = function(){
        self.text = self.text.replace('En un ranking de 0 a 100, donde 0 es el menor y 100 es el mayor, tu estás en el lugar:', '');
      };
    }
  });
})();
