// Mencionando el modulo de express para nuestro proyecto
const express = require('express')
 
// creando nuestro objeto central (global) que se utilizara en nuestro proyecto (rutas, funciones, configuraciones)
const app = express()
 

//indicamos que nuestra API tiene un middleware para interpretar los datos que vienen en formato JSON (body)
app.use(express.json())

//simulando una base de datos de estudiantes
const estudiantes = [
    { id: 1, nombre: "Karla Grijalva", edad: 18, correo: "karlaa.grijalva@email.com" },
    { id: 2, nombre: "Erick Sanabria", edad: 17, correo: "erick.sanabria@email.com" },
    { id: 3, nombre: "Jessica Castillo", edad: 18, correo: "jessica.castillo@email.com" }
]

// por defecto el puerto de express 3000
// servidor = localhost:3000
app.listen(3000, () => {
    console.log("Hola, este es el servidor http://localhost:3000/")
})
 
// comando para ejecutar el servidor (archivo) -> node index.js
 
// creando enrutamiento para nuestra API
 
// creando la ruta principal (peticion HTTP: GET, POST, PUT, DELETE, PATCH)
/**
 * (primer parametro) req = request (se utiliza cuando necesitamos por ejemplo datos del usuario (body), headers, parametros)
 * (segundo parametro) res = response (lo que se devuelve al cliente)
 */
 
// Mi primer endpoint
app.get('/', (req, res) => {
    //codigo de la funcion
    res.send("Hola Mundo, Bienvenidos a mi API Estudiantes")
})

//ruta para obtener todos los estudiantes(segundo endpoint)
app.get('/estudiantes', (req, res) => {
    // codigo
    res.status(200)(estudiantes)

})


//ruta para obtener un estudiante por su id (tercer endpoint)

//ruta paracrear un nuevo estudiante

//ruta para actualizar un estudiante(correo)
