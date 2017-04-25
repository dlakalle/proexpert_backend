(function(){
  angular.module('appModule').component('informe', {
    templateUrl: 'app/informe/informe.component.html',
    controller: function InformeController(){
      var self = this;
      
      self.tarjetas = [
        {
          value: "1.300.000",
          iconClass: "fa-graduation-cap",
          description: "Al realizar una comparación de tu sueldo con otros ingenieros que comparten tu Carrera, Industria y Años de Experiencia, tu sueldo es $255.000 inferior que el promedio. En un ranking de 0 a 100 donde 0 es el menor y 100 es el mayor, tú estás en el lugar:",
          percent: 32,
          passClass: "fa-times"
        },
        {
          value: "1.550.000",
          iconClass: "fa-black-tie",
          description: "Hello World.",
          percent: 81,
          passClass: "fa-check"
        }
      ];
    }
  });
})();
