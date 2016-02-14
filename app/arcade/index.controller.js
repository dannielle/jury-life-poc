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

        vm.createGame = createGame;

        initController();

        function initController() {
            getAllGames();
        }

        function getAllGames() {
            ArcadeService.GetAllGames().then(function (games) {
                vm.arcade.games.title = games;
            })
            .catch(function (error) {
                FlashService.Error(error);
            });
        }

        function createGame() {
            ArcadeService.CreateGame(vm.game)
                .then(function () {
                    FlashService.Success('New Game Added');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });

        }
    }

})();