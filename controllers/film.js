'use strict';

const Film = require('../models/Film');
const FilmStar = require('../models/FilmStar');
const fs = require('fs');

//DONE
exports.addFilm = async(req, res) => {
    const {title, releaseYear, format} = req.body;
    const stars = req.body.stars.split(",");

    try {
        let newFilm = await Film.create({
            title: title,
            releaseYear: releaseYear,
            format: format,
        });

        for (let star of stars) {
            await FilmStar.create({
                filmId: newFilm.id,
                starName: star,
            });
        }

        res.status(200).json({
            success: true,
            message: 'film added successfully',
        });
    } catch (e) {
        console.log(e);

        res.status(200).json({
            success: false,
        });
    }

}

exports.deleteFilm = async(req, res) => {
    const film = await Film.destroy({where: {id: req.params.id}});

    if (film) {
        res.status(200).json({
            success: true,
            message: 'delete film successfully',
        });
    } else {
        res.status(200).json({
            success: false,
            message: 'film not found',
        });
    }
}

exports.getFilmByID = async(req, res) => {
    const id = req.params.id
    const film = await Film.findOne({where: {id: id}});
    const stars = await FilmStar.findAll({where: {filmId: id}}); //?

    if (film) {
        res.status(200).json({
            success: true,
            data: film,
            stars: stars,
        });
    } else {
        res.status(200).json({
            success: false,
            message: 'film not found',
        });
    }
}

exports.getFilmByName = async(req, res) => {
    const filmName = req.body.filmName;
    const film = await Film.findOne({where: {title: filmName}});
    const stars = await FilmStar.findAll({where: {filmId: filmName}}); //?

    if (film) {
        res.status(200).json({
            success: true,
            data: film,
        })
    } else {
        res.status(200).json({
            success: false,
            message: 'film not found',
        });
    }
}

exports.getAllSorted = async(req, res) => {
    const films = await Film.findAll({order: [['title', 'ASC']]});

    res.status(200).json({
        success: true,
        message: films,
    });
}

exports.getFilmByStar = async(req, res) => {
    const star = await FilmStar.findAll({where: {star: req.body.star}});
    let films = {};

    for (let film of star) {
        films.push(await Film.findOne({where: {id: film.id}}));
    }
    res.status(200).json({
        success: true,
        data: films,
    });
}

exports.importFromFile = async(req, res) => {
    const file = req.file;

    try {
        const films = fs.readFileSync(file.path, 'utf8').split('\n');

        for (let film of films) {
            console.log(film.split(/^[\w]*:\s/)[1]);

            // await Film.create({
            //     title: film[0].split(/, /),
            // })
        }

        res.status(200).json({
            success: true,
            path: films,
        });

    } catch (err) {
        console.error(err)
    }

}