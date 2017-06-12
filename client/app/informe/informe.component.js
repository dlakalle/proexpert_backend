(function(){
  angular.module('appModule').component('informe', {
    templateUrl: 'app/informe/informe.component.html',
    controller: function InformeController(authClientService, informeService){
      var self = this;

      self.$onInit = function(){
        informeService.getInforme().then(
          function successCallback(response){
          console.log('informe:', response);
          self.tarjetas = response.data.informe.tarjetas;
          self.por_cargo = response.data.informe.por_cargo;
          self.por_institucion = response.data.informe.por_institucion;
        }, function errorCallback(error){
          console.log(error);
        });
      };

    }
  });
})();
