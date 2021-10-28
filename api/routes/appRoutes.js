module.exports = function(app) {
    let userRoutes = require('./userRoutes.js')
    let notesBooksRoutes = require('./noteBookRoutes.js')

    userRoutes(app);
    notesBooksRoutes(app);
}