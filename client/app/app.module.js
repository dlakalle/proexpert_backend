(function(){
  var app = angular.module('appModule', [
    'ngMaterial',
    'ui.router',
    'angular-storage',
    'googlechart',
    'ngSanitize'
  ])
  .config(function($mdThemingProvider) {

  $mdThemingProvider.theme('default')
    .primaryPalette('grey', {
      'default': '50', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '400', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '500', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': '400' // use shade A100 for the <code>md-hue-3</code> class
    });
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    // .accentPalette('grey', {
    //   'default': '400' // use shade 200 for default, and keep all other shades the same
    // });
  }).filter('comma2dot', function () {
    return function (input) {
      input = '' + input;
      return input.split(',').join('.');
    };
  });

})();
