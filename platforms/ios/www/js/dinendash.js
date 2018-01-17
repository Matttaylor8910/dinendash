(function () {
  angular
    .module('dinendash', [
      'ionic',
      'ionic.utils',
      'firebase',
      'angularMoment',

      'billList',
      'editBill'
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
      apiKey: "AIzaSyB3xLDWymwsNOoPJCwUydO8BV0DIiuFeVw",
      authDomain: "dine-n-dash-65f1f.firebaseapp.com",
      databaseURL: "https://dine-n-dash-65f1f.firebaseio.com",
      projectId: "dine-n-dash-65f1f",
      storageBucket: "dine-n-dash-65f1f.appspot.com",
      messagingSenderId: "523461503861"
    };
    firebase.initializeApp(config);
  }
})();
