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
        if(self.yours !== undefined){
          if(self.yours.nombre !== ''){
            self.hasYours = true;
          }
        }

        if(self.posiciones[0]){
          if(self.posiciones[0].nombre === ''){
            self.enoughData = false;
          }
          else{
            self.enoughData = true;
          }
        }
      };
    }
  });
})();
