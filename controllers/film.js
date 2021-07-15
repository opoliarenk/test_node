'use strict';

const Film = require('../models/Film');
const Star = require('../models/Star');
const fs = require('fs');

//**************** POST *****************
exports.add = async(req, res) => {
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
            message: e.message,
        });

    }
};

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

    } catch (e) {
        res.status(200).json({
            success: false,
            message: e.message,
        })
    }
};
//***************************************


//**************** GET *****************
exports.getAllSorted = async(req, res) => {
    const films = await Film.findAll({order: [['title', 'ASC']]});

    res.status(200).json({
        success: true,
        message: films,
    });
}

exports.getByID = async(req, res) => {
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

        throw TypeError('film not found');

    } catch (e) {
        res.status(200).json({
            success: false,
            message: e.message,
        });
    }
}

exports.getByName = async(req, res) => {
    try {
        const film = await Film.findOne({where: {title: req.body.filmName}});

        if (film) {
            res.status(200).json({
                success: true,
                data: film,
            })
            return
        }
        throw TypeError('film not found');

    } catch (e) {
        res.status(200).json({
            success: false,
            message: e.message,
        });
    }
}

exports.getByStar = async(req, res) => {
    try {
        const star = await Star.findAll({where: {starName: req.body.star}});
        let films = [];

        for (let film of star) {
            films.push(await Film.findOne({where: {id: film.filmID}}));
        }

        res.status(200).json({
            success: true,
            data: films,
        });

    } catch (e) {
        res.status(200).json({
            success: false,
            message: e.message,
        });

    }
}
//***************************************


//**************** DELETE *****************
exports.delete = async(req, res) => {
    try {
        if (await Film.destroy({where: {id: req.params.id}})) {
            res.status(200).json({
                success: true,
                message: 'delete film successfully',
            });
            return;

        }
        throw TypeError('film not found');
    } catch (e) {
        res.status(200).json({
            success: false,
            message: e.message,
        });

    }
}
//***************************************