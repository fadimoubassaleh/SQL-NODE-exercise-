const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('mydatabase.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

// INSERT (add) one element to movies
// db.run('INSERT INTO movies(id, name, genre) VALUES(7, "newname", "newgenre")', function (err) {
//     if (err) {
//         return console.log(err.message);
//     }
//     console.log(`A row has been inserted with rowid ${this.lastID}`)
// })

// UPDATE one the elemnts from movies
// let data = ['hello my friends', 6];
// let sql = `UPDATE movies SET name=? WHERE id=?`
// db.run(sql, data, function(err){
//     if (err){
//         return console.error(err.message);
//     }
//     console.log(`it's updated`)
// })

// DELETE one of the elemnts from movies
db.run(`DELETE FROM movies WHERE id=?`, 7, function(err){
    if (err){
        return console.error(err.message)
    }
    console.log(`DELETE is work`)
})

// select all elemnts from movies table
db.all('SELECT * FROM movies', (err, rows) => {
    if (err) {
        console.log(err)
    }
    rows.forEach((row) => {
        // console.log(row.id + '\t' + row.name + '\t' + row.genre)
        console.log(row)
    })
})




// close the database connection
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});