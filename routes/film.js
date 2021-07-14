'use strict';

const router = require('express').Router();
const film = require('../controllers/film');
const upload = require('multer')({dest: 'uploads/'});

router.post('/addFilm', film.addFilm);

router.delete('/deleteFilm', film.deleteFilm);

router.get('/getFilm/:id', film.getFilmByID);

router.get('/getByName', film.getFilmByName);

router.get('/getAllSorted', film.getAllSorted);

router.post('/importFile', upload.single('fileName'), film.importFromFile);

module.exports = router;