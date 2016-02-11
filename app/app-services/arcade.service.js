(function () {
    'use strict';

    angular
        .module('app')
        .factory('ArcadeService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetAllGames = GetAllGames;

        return service;

        function GetAllGames() {
            return $http.get('/api/arcade/games').then(handleSuccess, handleError);
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
