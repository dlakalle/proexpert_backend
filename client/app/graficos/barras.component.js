(function(){
  angular.module('appModule').component('barras', {
    templateUrl: 'app/graficos/barras.component.html',
    controller: function BarrasController(){
      var self = this;

      self.myChartObject = {};
    
      self.myChartObject.type = "ColumnChart";
      
      self.industria = [
          {v: "Salud"},
          {v: 950000},
          {v: '#d83c49'}
      ];

      self.myChartObject.data = {"cols": [
          {id: "t", label: "Industria", type: "string"},
          {id: "s", label: "Sueldo Promedio", type: "number"},
          {role: 'style', type: 'string'}
      ], "rows": [
          {c: [
              {v: "Minería"},
              {v: 3000000}
          ]},
          {c: self.industria},
          {c: [
              {v: "Financiera"},
              {v: 1700000}
          ]},
          {c: [
              {v: "Energía"},
              {v: 2300000},
          ]},
          {c: [
              {v: "Informática"},
              {v: 1500000},
          ]}
      ]};

      self.myChartObject.options = {
          'title': 'Industria (Considerando Carrera y Años de Experiencia)',
          colors: ['#e7e8c0']
      };

    }
  });
})();
