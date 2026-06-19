// Mencionando el modulo de express para nuestro proyecto
const express = require('express')

// creando nuestro objeto central (global) que se utilizara en nuestro proyecto (rutas, funciones, configuraciones)
const app = express()

// indicamos que nuestra api tiene un middleware (procesar datos en formato JSON)
app.use(express.json())

// simulando una base de datos de estudiantes
let estudiantes = [
    { id: 1, nombre: "Magdalena Sanabria", edad: 18, correo: "magdalena.sanabria@email.com" },
    { id: 2, nombre: "Alma Cardoza", edad: 17, correo: "alma.cardoza@email.com" },
    { id: 3, nombre: "Lorena Mejía", edad: 18, correo: "lorena.mejia@email.com" },
    { id: 4, nombre: "Alba Acevedo", edad: 16, correo: "alba.acevedo@email.com" },
    { id: 5, nombre: "Jessica Lopez", edad: 19, correo: "jessica.lopez@email.com" }
];

// por defecto el puerto de express 3000
// servidor = localhost:3000
app.listen(3000, () => {
    console.log("Hola, este es el servidor http://localhost:3000/")
})

// comando para ejecutar el servidor (archivo) -> node index.js


// --- ENRUTAMIENTO PARA NUESTRA API ---

// Mi primer endpoint (Bienvenida)
app.get('/', (req, res) => {
    res.send("Hola Mundo, Bienvenidos a mi API Estudiantes")
})

// ruta para obtener todos los estudiantes
app.get('/estudiantes', (req, res) => {
    res.status(200).json(estudiantes)
});

// ruta para buscar un estudiante por ID
app.get('/estudiantes/:id', (req, res) => {
    // Capturando el valor del parámetro (usando :id de forma consistente)
    const id = Number(req.params.id); 
    const encontrar_estudiante = estudiantes.find(estudiante => estudiante.id === id);

    // validando si el estudiante NO existe
    if(!encontrar_estudiante){
        return res.status(404).json({ error: 'Estudiante no encontrado' })
    }

    res.status(200).json(encontrar_estudiante)
});

// ruta para crear un nuevo estudiante
app.post('/estudiantes', (req, res) => {
    const { nombre, edad, correo } = req.body

    // Validación básica antes de agregar
    if (!nombre || !edad || !correo) {
        return res.status(400).json({ error: "Faltan campos obligatorios (nombre, edad, correo)." });
    }

    // agregamos los datos ingresados a un objeto
    const nuevoEstudiante = {
        // Generación de ID dinámico basado en el último elemento para evitar colisiones
        id: estudiantes.length > 0 ? estudiantes[estudiantes.length - 1].id + 1 : 1,
        nombre,
        edad: Number(edad),
        correo
    }

    // agregamos el nuevo objeto al arreglo
    estudiantes.push(nuevoEstudiante);

    res.status(201).json({
        message: 'Registrado exitosamente',
        estudiante: nuevoEstudiante
    })
});

// ruta para actualizar un estudiante de forma completa (PUT)
app.put('/estudiantes/:id', (req, res) => {
    const id = Number(req.params.id); 
    const encontrar_estudiante = estudiantes.find(estudiante => estudiante.id === id);

    // Validando si el estudiante NO existe
    if(!encontrar_estudiante){
        return res.status(404).json({ error: 'Estudiante no encontrado' })
    }

    // Capturamos los campos del cuerpo de la petición
    const { nombre, edad, correo } = req.body;

    // Validación: verificar que vengan los datos requeridos
    if (!nombre || !edad || !correo) {
        return res.status(400).json({ error: 'Todos los campos (nombre, edad, correo) son obligatorios para PUT' });
    }

    // Actualizamos todas las propiedades del estudiante encontrado
    encontrar_estudiante.nombre = nombre;
    encontrar_estudiante.edad = Number(edad);
    encontrar_estudiante.correo = correo;

    res.status(200).json({
        message: 'Estudiante actualizado exitosamente con PUT',
        estudiante: encontrar_estudiante
    });
});

// DELETE: Eliminar un estudiante
app.delete('/estudiantes/:id', (req, res) => {
    // Corregido: Ahora lee el parámetro correcto (:id)
    const id = Number(req.params.id);
    const indice = estudiantes.findIndex(e => e.id === id);

    if (indice === -1) {
        return res.status(404).json({ mensaje: `No se puede eliminar. Estudiante con ID ${id} no encontrado.` });
    }

    // Eliminar del array
    const estudianteEliminado = estudiantes.splice(indice, 1);

    res.status(200).json({ 
        mensaje: "Estudiante eliminado con éxito", 
        estudiante: estudianteEliminado[0] 
    });
});