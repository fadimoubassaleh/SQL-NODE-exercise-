const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('mydatabase.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

db.all('SELECT * FROM movies', (err, rows) => {
    if (err) {
        console.log(err)
    }
    rows.forEach((row) => {
        console.log(row.id + '\t' + row.name + '\t' + row.genre)
        console.log(row)
    })
})

db.run('INSERT INTO movies(id, name, genre) VALUES(6, "newname", "newgenre")', function(err){
    if(err){
        return console.log(err.message);
    }
    console.log('A row has been inserted with rowid ')
})

// close the database connection
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});