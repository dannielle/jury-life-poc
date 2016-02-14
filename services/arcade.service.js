var config = require('config.json');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.connectionString);
var gamesDb = db.get('games');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var service = {};

service.getAllGames = getAllGames;
service.create = create;

module.exports = service;

function getAllGames() {
    var deferred = Q.defer();

    gamesDb.find({}, function (err, games) {
        if (err) deferred.reject(err);

        deferred.resolve(games);
    });

    return deferred.promise;
}

function create(gameParam) {
    var deferred = Q.defer();

    // validation
    gamesDb.findOne(
        { gameTitle: gameParam.title },
        function (err, game) {
            if (err) deferred.reject(err);

            if (game) {
                // game already exists
                deferred.reject('Game "' + gameParam.title + '" is already taken');
            } else {
                createGame();
            }
        });

    function createGame() {
        var game = gameParam;

        gamesDb.insert(
            game,
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

