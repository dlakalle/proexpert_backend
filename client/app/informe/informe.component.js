(function(){
  angular.module('appModule').component('informe', {
    templateUrl: 'app/informe/informe.component.html',
    controller: function InformeController(){
      var self = this;
      self.message = 'Hello world informe';

      
    }
  });
})();
