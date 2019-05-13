
/**
 *      servidor v.0.1
 * 
 */


const express  = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false})

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
 **/

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

app.get('/catalogo', (req, res) => {
    const sql = 'SELECT * FROM libros';
    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }else{
            console.log("Catalogo Data: ",result);
            res.render('catalogo.ejs', {catlibros:result});
        }
    })
})

app.get('/carrito', (req, res) => {
    const sql = 'SELECT * FROM libros';
    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }else{
            res.render('carrito.ejs', {ref:result});
        }
    })
})

app.post('/carrito/add', urlencodedParser, (req, res) => {
    const { nombre, correo, ref } = req.body;
    const clibros = {
        nombre,
        correo,
        ref
    }
    db.query('INSERT INTO comprar SET ?', [clibros], (err, result) =>{
        if(err){
            throw err;
        }else{
            console.log(result);
            console.log(clibros);
        }
    });
    res.redirect('/carrito');
})

app.post('/carrito/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    res.send('post request received');
})

app.delete('/carrito/:carritoId', (req, res) => {
    console.log(req.params);
    res.send(`usuario ${req.params.userId} eliminado`);
})

app.put('/carrito/:carritoId', (req, res) => {
    console.log(req.body);
    res.send(`usuario ${req.params.userId} actualizado`);
})

//statics
app.use(express.static('public'));


app.listen(app.get('port'), () => {
    console.log('server: ', app.get('port'));
})