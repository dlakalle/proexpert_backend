(function(){
  angular.module('appModule').component('ranking', {
    templateUrl: 'app/ranking/ranking.component.html',
    bindings: {
      config: '<'
    },
    controller: function RankingController(){
      var self = this;

      self.$onInit = function(){
        self.posiciones = self.config.posiciones;
        self.yours = self.config.yours;
        self.titulo = self.config.titulo;
        self.desc = self.config.desc;
      };
    }
  });
})();
