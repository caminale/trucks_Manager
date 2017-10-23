const express = require('express');
const router = express.Router();
const City = require('../models/City.js');

/* GET ALL Cities */
router.get('/', function(req, res, next) {
    City.find(function (err, Cities) {
        if (err) return next(err);
        res.json(Cities);
    });
});

/* GET SINGLE City BY ID */
router.get('/:id', function(req, res, next) {
    City.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE City */
router.post('/', function(req, res, next) {
    City.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE City */
router.put('/:id', function(req, res, next) {
    City.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE City */
router.delete('/:id', function(req, res, next) {
    City.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;