'use strict';

const Film = require('../models/Film');
const Star = require('../models/Star');
const fs = require('fs');

//DONE
exports.addFilm = async(req, res) => {
    try {
        const {title, releaseYear, format} = req.body;
        const stars = req.body.stars.split(", ");

        //create film information
        let newFilm = await Film.create({
            title: title,
            releaseYear: releaseYear,
            format: format,
        });

        for (let star of stars) {
            await Star.create({
                filmID: newFilm.id,
                starName: star,
            });
        }

        res.status(200).json({
            success: true,
            message: 'film added successfully',
        });

    } catch (e) {
        res.status(200).json({
            success: false,
            message: 'please enter all parameters',
        });

    }
}

exports.deleteFilm = async(req, res) => {
    try {
        if (await Film.destroy({where: {id: req.params.id}})) {
            res.status(200).json({
                success: true,
                message: 'delete film successfully',
            });
            return;

        }
        throw TypeError();
    } catch (e) {
        res.status(200).json({
            success: false,
            message: 'film not found',
        });
    }
}

exports.getFilmByName = async(req, res) => {
    try {
        const filmName = req.body.filmName;
        const film = await Film.findOne({where: {title: filmName}});

        if (film) {
            res.status(200).json({
                success: true,
                data: film,
            })
            return
        }
        throw TypeError();

    } catch (e) {
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

exports.getFilmByID = async(req, res) => {
    try {
        const id = req.params.id
        const film = await Film.findOne({where: {id: id}});
        const stars = await Star.findAll({where: {filmId: id}}); //?

        if (film) {
            res.status(200).json({
                success: true,
                data: film,
                stars: stars,
            });
            return;
        }

        throw TypeError();

    } catch (e) {
        res.status(200).json({
            success: false,
            message: 'film not found',
        });
    }
}

exports.getFilmByStar = async(req, res) => {
    const star = await Star.findAll({where: {starName: req.body.star}});
    let films = {};

    for (let film of star) {
        films.push(await Film.findOne({where: {id: film.filmID}}));
    }
    res.status(200).json({
        success: true,
        data: films,
    });
}

exports.importFromFile = async(req, res) => {
    const file = req.file;
    const reg = /: (.+)/; //split by ': '
    let stars;

    try {
        const films = fs.readFileSync(file.path, 'utf8').split(/\n\n/);

        for (let film of films) {
            if (film) {
                let filmParams = film.split('\n');

                let newFilm = await Film.create({
                    title: filmParams[0].split(reg)[1],
                    releaseYear: filmParams[1].split(reg)[1],
                    format: filmParams[2].split(reg)[1],
                });

                stars = filmParams[3].split(reg)[1].split(', ');

                for (let star of stars) {
                    await Star.create({
                        filmID: newFilm.id,
                        starName: star,
                    });
                }
            }
        }

        res.status(200).json({
            success: true,
        });

    } catch (err) {
        console.error(err)
        res.status(200).json({
            success: false,
        })
    }

}