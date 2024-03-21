const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const { join } = require("path");

//Inicializar
const app = express();

//Configuración
app.set('port', process.env.PORT || 3000);
//configurando carpeta para las vistas
app.set('views', join(__dirname, 'views'));
//confirar motor de plantilla
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middelweares
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.get('/', (req, res)=>{
    res.render('index')
})

//Publics Files
app.use(express.static(join(__dirname, 'public')));

//Run Server
app.listen(app.get('port'), () =>
    console.log('cargando en el puerto', app.get('port'))
);
