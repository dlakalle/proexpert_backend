(function(){
  angular.module('appModule').component('informe', {
    templateUrl: 'app/informe/informe.component.html',
    controller: function InformeController(authClientService, informeService){
      var self = this;

      self.$onInit = function(){
        informeService.getInforme().then(
          function successCallback(response){
          console.log('informe:', response);
          self.informe = response.data.informe;
          self.tarjetas = response.data.informe.tarjetas;
          self.por_cargo = response.data.informe.por_cargo;
          self.por_institucion = response.data.informe.por_institucion;
          self.por_industria = response.data.informe.por_industria;
        }, function errorCallback(error){
          console.log(error);
        });



        informeService.getEncuesta().then(
          function successCallback(response){
          console.log("ENCUESTA:", response.data);
        }, function errorCallback(error){
          console.log(error);
        });

        informeService.getGlobalStats().then(function successCallback(response){
          console.log("GLOBAL:", response.data);
        }, function errorCallback(error){
          console.log(error);
        });

      };

    }
  });
})();
