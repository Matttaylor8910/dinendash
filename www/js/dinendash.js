(function () {
  angular
    .module('dinendash', [
      'ionic',
      'ionic.utils',
      'firebase',
      'angularMoment',

      'addNames'
    ])
    .config(config)
    .run(run);

  function config($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  }

  function run($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });

    var config = {
      apiKey: 'AIzaSyBe_ufI3rDd9aLQ95B1iDkKNdsslPmMr2o',
      authDomain: 'wca-environments.firebaseapp.com',
      databaseURL: 'https://wca-environments.firebaseio.com',
      projectId: 'wca-environments',
      storageBucket: 'wca-environments.appspot.com',
      messagingSenderId: '79698754742'
    };
    firebase.initializeApp(config);
  }
})();
