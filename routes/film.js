'use strict';

const router = require('express').Router();
const film = require('../controllers/film');
const upload = require('multer')({dest: 'uploads/'});

router.post('/add', film.add);

router.post('/importFile', upload.single('fileName'), film.importFromFile);

router.get('/getAllSorted', film.getAllSorted);

router.get('/getById/:id', film.getByID);

router.get('/getByName', film.getByName);

router.get('/getByStar', film.getByStar);

router.delete('/delete/:id', film.delete);

module.exports = router;