'use strict';

module.exports = app => {
    const filmRouter = require('./film');

    app.use('/film', filmRouter);
}
