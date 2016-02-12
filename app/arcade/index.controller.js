(function () {
    'use strict';

    angular
        .module('app')
        .controller('Arcade.IndexController', ArcadeController);

    function ArcadeController(ArcadeService, FlashService) {
        var vm = this;

        vm.arcade = {};

        vm.arcade.games = {}

        vm.arcade.games.title = null;

        initController();

        function initController() {
            ArcadeService.GetAllGames().then(function (games) {
                vm.arcade.games.title = games;
            })
            .catch(function (error) {
                FlashService.Error(error);
            });
        }
    }

})();