(function(){
  angular.module('appModule').component('progressBar', {
    templateUrl: 'app/indicadores/progress-bar/progress-bar.component.html',
    bindings: {
    	value: '<',

    },
    controller: function ProgressBarController(){
      var self = this;
      self.color = "#fff";

      self.$onInit = function(){
        if(self.value === '¿?'){
          self.color = "white";
        }
      	else if(self.value <= 33){
      		self.color = "#EF5350";
      	}
      	else if(self.value <= 66){
      		self.color = "#E2B512";
      	} else {
      		self.color = "#78B347";
      	}
      };
    }
  });
})();
