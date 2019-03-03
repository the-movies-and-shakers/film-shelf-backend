const mysql =require ("mysql");

function getDatabaseConnection() {
    return mysql.createConnection({
        host: process.env.RDS_HOST,
        user: process.env.RDS_USER,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE
    });
}

function getFilms() {
    const connection = getDatabaseConnection();
    return new Promise(function(resolve, reject) {
        connection.query("SELECT * FROM filmshelf", function(error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            } 
            else {
                connection.end(function() { 
                return resolve(results);
       
                });
            }
        });
    });
}

function deleteFilm() {
    const connection = getDatabaseConnection();
    return new Promise(function(resolve, reject) {
        connection.query('DELETE FROM Tasks WHERE filmId = ?',[filmId], function(error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            } 
            else {
                connection.end(function() { 
                return resolve(results);
       
                });
            }
        });
    });
}

function saveFilm(filmTitle) {
    const connection = getDatabaseConnection();

    return new Promise(function(resolve, reject) {

        const postData = {
            Description: filmTitle,
            userId: 1 //should this say filmId?
        };
        connection.query('INSERT INTO filmdata SET ?', postData, function (error, results, fields) {
            if (error) {
            connection.destroy();
            return reject(error);
        }
            else {
                connection.end(function() {
                return resolve(results);

                });
            }
        });
    });
}

//I dont think we need this as we dont need to mark the film as being completed: -

// function completeFilm(filmIdToComplete) {

//     const connection = getDatabaseConnection();

//     return new Promise(function(resolve, reject) {

//         connection.query("UPDATE film SET Completed = 1 WHERE FilmID = ?", filmIdToComplete, function (error, results, fields) {
//             if (error) {
//                 connection.destroy();
//                 return reject(error);
//             }
//             else {
//                 connection.end(function() {
//                     return resolve(results);
//                 });
//             }
//         });
//     });
//  };

function editFilm(editedFilmTitle, identifier) {

    const connection = getDatabaseConnection();

    return new Promise(function(resolve, reject) {

        connection.query("UPDATE films SET filmTitle = ? WHERE filmId = ?", editedFilmTitle, identifier, function (error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end(function() {
                    return resolve(results);
                });
            }
        });
    });
 };

module.exports = {
    getFilms,
    deleteFilm,
    saveFilm,
    // completeFilm,
    editFilm
};
