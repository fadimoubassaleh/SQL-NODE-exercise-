const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('mydatabase.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

// INSERT (add) one element to movies
const insertOne = (name, genre) => {
    console.log(name + " " + genre)
    db.run(`INSERT INTO movies(name, genre) VALUES(?, ?)`, [name, genre], function (err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`)
    })
}

// UPDATE one the elemnts from movies
const updateOne = () => {
    let sql = `UPDATE movies SET name=? WHERE id=?`
    let data = ['hello my friends', 6];
    db.run(sql, data, function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`it's updated`)
    })
}

// DELETE one of the elemnts from movies
const deleteOne = () => {
    db.run(`DELETE FROM movies WHERE id=?`, 7, function (err) {
        if (err) {
            return console.error(err.message)
        }
        console.log(`DELETE is work`)
    })
}

// select all elemnts from movies table
const mapAllTable = () => {
    db.all('SELECT * FROM movies', (err, rows) => {
        if (err) {
            console.log(err)
        }
        rows.forEach((row) => {
            // console.log(row.id + '\t' + row.name + '\t' + row.genre)
            console.log(row)
        })
    })
}




// close the database connection
const shutdownDB = () => {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}


// runnig part

const args = process.argv.slice(2)
const command = args[0]
if (command === "--add") {
    const name = args[1]
    const genre = args[2]
    if (!name) {
        console.log('you have to provide a name')
        process.exit()
    } else if (!genre) {
        console.log('you have to provide a gemre')
        process.exit()
    } else {
        insertOne(name, genre)
    }
}else if (command === "--list"){
    mapAllTable()
}
shutdownDB()

















//               EXPRESS PART           /////////

// const express = require('express');
// const bodyParser = require('body-parser')
// const app = express();

// app.get('/', (req, res) => {
//     res.send('./index.html')
// })


// // Runnig the server 
// const port = 3000; // listing port
// app.listen(port, () => {
//     console.log('Listening on port: ' + port)
// })
