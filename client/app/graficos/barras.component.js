(function(){
  angular.module('appModule').component('barras', {
    templateUrl: 'app/graficos/barras.component.html',
    bindings: {
      config: '<'
    },
    controller: function BarrasController(){
      var self = this;

      self.myChartObject = {};
    
      self.myChartObject.type = "ColumnChart";

      self.myChartObject.ready = false;
      
      self.$onInit = function(){
        
        var color = self.config.yours.resultado ? '#77b346' : '#d83c49';   
        var rows = [
          {
            c: [
              {v: self.config.yours.nombre},
              {v: self.config.yours.sueldo},
              {v: color}
            ]
          }
        ];

        angular.forEach(self.config.posiciones, function(value, key) {
          rows.push({
            c: [
              {v: value.nombre},
              {v: value.sueldo}
            ]
          });
        });


        self.myChartObject.data = {"cols": [
            {id: "t", type: "string"},
            {id: "s", type: "number"},
            {role: 'style', type: 'string'}
          ], "rows": rows
        };

        self.myChartObject.options = {
          width: '100%',
          height: '100%',
          legend: 'none',
          colors: ['#e7e8c0'],
          chartArea: {
            left: "20%",
            top: "10%",
            height: "70%",
            width: "70%"
          }
        };

        self.myChartObject.ready = true;

      };

    }
  });
})();
