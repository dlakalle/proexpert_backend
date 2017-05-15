(function(){
  angular.module('appModule').component('rankingItem', {
    templateUrl: 'app/ranking/ranking-item/ranking-item.component.html',
    bindings: {
      item: '<'
    },
    controller: function RankingItemController(){
      var self = this;
      self.$onInit = function(){
        if(self.item.resultado !== undefined && self.item.resultado !== null){
          self.color = self.item.resultado ? 'success': 'failure';
        }
        else {
          self.color = 'default';
        }

        self.bgClass = 'ranking_item_' + self.color;
      };
    }
  });
})();
