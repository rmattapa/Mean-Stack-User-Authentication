(function() {
  
  angular
    .module('meanApp')
    .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$location','authentication'];
    function homeCtrl ($location,authentication) {
      console.log('Home controller is running');
      var vm = this;
      vm.isLoggedIn = authentication.isLoggedIn();
    }

})();