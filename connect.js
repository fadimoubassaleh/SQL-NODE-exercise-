const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('mydatabase.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

// INSERT (add) one element to movies
const insertOne = (name, genre, results) => {
    db.run(`INSERT INTO movies(name, genre) VALUES(?, ?)`, [name, genre], function (err) {
        if (err) {
            return results(err.message);
        }
        results(`A row has been inserted with rowid ${this.lastID}`)
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
const deleteOne = (id, results) => {
    db.run(`DELETE FROM movies WHERE id=?`, id, function (err) {
        if (err) {
            return results(err.message)
        }
        results(`you just delete movie with id: `+ id)
    })
}

// SELECT all elemnts from movies table
const mapAllTable = (callback) => {
    db.all('SELECT * FROM movies', (err, rows) => {
        if (err) {
            console.log(err)
        }
        let moviesHTML = '<ul>'
        rows.forEach((row) => {
            moviesHTML += '<li>' + (row.id + '\t' + row.name + '\t' + row.genre) + '</li>'
            // console.log(row.id + '\t' + row.name + '\t' + row.genre)
            console.log(row)
        })
        moviesHTML += '</ul>'
        const page = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        <body>
            <div class="main">
            `+ moviesHTML + `
            </div>
        </body>
        </html>`
        callback(page)
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
} else if (command === "--list") {
    mapAllTable()
}



// 
// 
//               EXPRESS PART           /////////
// 
// 

const express = require('express');
const bodyParser = require('body-parser')
const app = express();

// path HOME page and render all movies ===> http://localhost:3000
app.get('/', (req, res) => {
    mapAllTable(function (rows) {
        console.log('there are the rows again')
        html = rows
        res.send(html)
    })
})

// path ADD to add more movie to the list ===> http://localhost:3000/add?name=<NAME>&genre=<GENRE>
app.get('/add', (req, res) => {
    const name = req.query.name;
    const genre = req.query.genre;
    if (!name){
        res.send('name is required')
    }else if (!genre){
        res.send('genre is required')
    }
    insertOne(name, genre, function(results){
        res.send(results)
    })
})

// path DELETE to delete one movie from the list ===> http://localhost:3000/delete/id
app.get('/delete/:id', (req, res) => {
    const id = req.params.id
    deleteOne(id, function(results){
        res.send(results)
    })
})

// path form to delete one movie from the list ===> http://localhost:3000/form/id
app.get('/form', (req, res)=>{
    const form= `
    <form>
        <input type="text" name="name" placeholder="name"/>
        <input type="text" name="genre" placeholder="genre"/>
        <input type="submit" value="ok"/>
    </form>
    `
    res.send(form)
})


// Runnig the server 
const port = 3000; // listing port
app.listen(port, () => {
    console.log('Listening on port: ' + port)
})
