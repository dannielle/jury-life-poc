var config = require('config.json');
var express = require('express');
var router = express.Router();
var arcadeService = require('services/arcade.service');

// routes
router.post('/', function (req, res) {
    arcadeService.create(req.body)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
});

router.get('/', function (req, res) {
    arcadeService.getAllGames(req.body)
        .then(function(games) {
            if (games) {
                res.send(games);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
});

module.exports = router;
