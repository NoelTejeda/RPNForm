/* Estas líneas importan los módulos necesarios para tu aplicación. express es el marco de trabajo para construir tu servidor, cors es un middleware para habilitar CORS (Cross-Origin Resource Sharing), pg es el cliente de PostgreSQL para Node.js, y port es el puerto en el que se ejecutará tu servidor. */

const express = require('express');
const app = express();
const cors = require('cors');
const pg = require('pg');
const port = 3001;
/********************************************************/

/* Aquí estás utilizando dos middlewares. express.json() se utiliza para analizar las solicitudes entrantes con cargas útiles JSON. cors() permite a tu aplicación manejar solicitudes CORS desde otros dominios. */
app.use(express.json());
app.use(cors())  // Permite realizar peticiones desde otros dominios

/********************************************************/

// Configura la conexión a la base de datos PostgreSQL
const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'crudReactNode',
  password: 'postgres',
  port: 5432,
});

/********************************************************/

// Aquí estás conectándote a la base de datos. Si la conexión es exitosa, se imprimirá un mensaje en la consola. Si hay un error, se imprimirá el error.
db.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });
/********************************************************/

/***************************** CREAR ****************************/
/* Este es tu endpoint POST para crear un nuevo empleado. Desestructuras req.body para obtener los detalles del empleado, luego ejecutas una consulta SQL para insertar estos detalles en la tabla ‘empleados’. Si la inserción es exitosa, envías una respuesta con el estado 201 y un mensaje de éxito. Si hay un error, capturas ese error y envías una respuesta con el estado 500 y un mensaje de error. */
app.post('/create', async (req, res) => {
  try {
    const { nombre, apellido, edad, pais, cargo, experiencia, residencia, email, telefono } = req.body;

    // Inserta los datos en la tabla 'empleados' ($1..son marcadores de posición)
    await db.query(
      'INSERT INTO empleados(nombre, apellido, edad, pais, cargo, experiencia, residencia, email, telefono) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [nombre, apellido, edad, pais, cargo, experiencia, residencia, email, telefono]
    );

    res.status(201).send('Empleado registrado con éxito');
  } catch (err) {
    console.error('Error al registrar el empleado:', err);
    res.status(500).send('Error al registrar el empleado');
  }
});

/***************************** READ ****************************/

app.get('/empleados', async (req, res) => {
  try {
    // Consulta los datos en la tabla 'empleados'
    const result = await db.query('SELECT * FROM empleados');

    // Verifica si result.rows está vacío
    if (result.rows.length > 0) {
      console.log(result.rows);
    } else {
      console.log('No hay empleados en la base de datos');
    }

    // Envía los resultados de la consulta
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error al obtener los empleados:', err);
    res.status(500).send('Error al obtener los empleados');
  }
});


/***************************** UPDATE ****************************/

app.put("/update", (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const edad = req.body.edad;
  const pais = req.body.pais;
  const cargo = req.body.cargo;
  const experiencia = req.body.experiencia;
  const residencia = req.body.residencia;
  const email = req.body.email;
  const telefono = req.body.telefono;

  db.query("UPDATE empleados SET nombre = $1, apellido = $2, edad = $3, pais = $4, cargo = $5, experiencia = $6, residencia = $7, email = $8, telefono = $9 WHERE id = $10",
    [nombre, apellido, edad, pais, cargo, experiencia, residencia, email, telefono, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Empleado Actualizado! ");
      }
    });
})


/***************************** DELETE ****************************/

app.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Elimina el empleado de la tabla 'empleados'
    await db.query('DELETE FROM empleados WHERE id = $1', [id]);

    res.status(200).send('Empleado eliminado con éxito');
  } catch (err) {
    console.error('Error al eliminar el empleado:', err);
    res.status(500).send('Error al eliminar el empleado');
  }
});






app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
