const express  = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

//instancias
const app = express();
const { database } = require('./database/database');
app.use(bodyParser.json());
app.use(cors());

//conexion
const db = mysql.createConnection(database);
db.connect();


app.set('port', 3000);
app.set('view engine', 'ejs');

/**
 * Routes
 * Base de datos de prueba.
 */

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM libros';
    db.query(sql, (err, result)=>{
        if(err){
            throw err;
        }else{
            console.log("Home Data: ",result);
            const data = result;
            res.render('index.ejs', {libros:data});
        }
    })
})

app.get('/catalogo', function(req, res){
    const sql = 'SELECT * FROM libros';
    db.query(sql, (err, result)=>{
        if(err){
            throw err;
        }else{
            console.log("Catalogo Data: ",result);
            res.render('catalogo.ejs', {catlibros:result});
        }
    })
})

app.post('/libros/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    res.send('respuesta recivida');
})

app.put('/libros/:id', (req, res) =>{
    console.log(req.body);
    res.send(`libro ${req.params.id} actualizado`);
})

app.delete('/libro/:libroId',(req,res) =>{
    res.send(`libro ${req.params.libroId} borrado`);
})


//statics
app.use(express.static('public'));


app.listen(app.get('port'), () => {
    console.log('server: ', app.get('port'));
})