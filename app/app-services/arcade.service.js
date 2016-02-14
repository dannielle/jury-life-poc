(function () {
    'use strict';

    angular
        .module('app')
        .factory('ArcadeService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetAllGames = GetAllGames;
        service.CreateGame = CreateGame;

        return service;

        function GetAllGames() {
            return $http.get('/arcade/games').then(handleSuccess, handleError);
        }


        function CreateGame(game) {
            return $http.post('/arcade/games', game).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
