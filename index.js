const express  = require('express');
const app = express();

//app.use(express.json());
app.set('port', 3000);

app.set('view engine', 'ejs');

//routes

app.get('/', (req, res) => {
    const data = [
        {
            "nombrelibro": "100 años de soledad",
            "id": "L001",
            "ref":"llj001",
            "cantidad": 10,
            "nombrepropietario": "Daniel Arango Villegas",
            "ciudad": "Medellin",
            "precio": 50000,
            "pais": "Colombia",
            "numerohojas":300,
            "portadalibro":"https://via.placeholder.com/150x150"
        },
        {
            "nombrelibro": "La Guerra de las Galaxias III",
            "id": "L002",
            "ref":"llj001",
            "cantidad": 1,
            "nombrepropietario": "Catalina Arango Villegas",
            "ciudad": "Rionegro",
            "precio": 30000,
            "pais": "Colombia",
            "numerohojas":1000,
            "portadalibro":"https://via.placeholder.com/150x150"
        }
    ]
    res.render('index.ejs', {libros:data});
})


//ejemplo de mi base de datos de prueba
app.get('/libros', (req, res) => {
    res.json({
        "libros":[{
            "nombrelibro": "100 años de soledad",
            "id": 0001,
            "cantidad": 10,
            "nombrepropietario": "Daniel Arango Villegas",
            "ciudad": "Medellin",
            "precio": 50000,
            "pais": "Colombia",
            "numerohojas":300
        },
        {
            "nombrelibro": "10 años de soledad",
            "id": 0002,
            "cantidad": 1,
            "nombrepropietario": "Daniel Arango Villegas",
            "ciudad": "Medellin",
            "precio": 30000,
            "pais": "Colombia",
            "numerohojas":1000
        }]

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