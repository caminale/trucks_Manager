const express = require('express');
const router = express.Router();
const Truck = require('../models/Truck.js');

/* GET ALL Trucks */
router.get('/', function(req, res, next) {
    Truck.find(function (err, Trucks) {
        if (err) return next(err);
        res.json(Trucks);
    });
});

/* GET SINGLE Truck BY ID */
router.get('/:id', function(req, res, next) {
    Truck.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE Truck */
router.post('/', function(req, res, next) {
    Truck.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE Truck */
router.put('/:id', function(req, res, next) {
    Truck.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE Truck */
router.delete('/:id', function(req, res, next) {
    Truck.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;