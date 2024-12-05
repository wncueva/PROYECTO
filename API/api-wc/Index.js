import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 8001;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    port: 3307,
    database: 'red_social'
});

db.connect((error) => {
    if (error) {
        console.log("Error al conectar a la base de datos:", error.message);
        return;
    }
    console.log("Conexión exitosa a la base de datos");
});


app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).send('Error al obtener los usuarios');
        }
        res.status(200).json(results);
    });
});


app.post('/usuarios', (req, res) => {
    const { nombre, correo } = req.body;
    const query = 'INSERT INTO usuarios (nombre, correo) VALUES (?, ?)';
    db.query(query, [nombre, correo], (error, results) => {
        if (error) {
            return res.status(500).send('Error al crear el usuario');
        }
        res.status(201).json('Usuario creado exitosamente');
    });
});


app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, correo } = req.body;
    const query = 'UPDATE usuarios SET nombre = ?, correo = ? WHERE id_usuario = ?';
    db.query(query, [nombre, correo, id], (error) => {
        if (error) {
            return res.status(500).send('Error al actualizar el usuario');
        }
        res.status(200).json('Usuario actualizado exitosamente');
    });
});


app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM usuarios WHERE id_usuario = ?';
    db.query(query, [id], (error) => {
        if (error) {
            return res.status(500).send('Error al eliminar el usuario');
        }
        res.status(200).json('Usuario eliminado exitosamente');
    });
});

// CRUD Grupos

app.get('/grupos', (req, res) => {
    const query = 'SELECT * FROM grupos';
    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).send('Error al obtener los grupos');
        }
        res.status(200).json(results);
    });
});

// Crear un nuevo grupo
app.post('/grupos', (req, res) => {
    const { nombre_grupo, descripcion } = req.body;
    const query = 'INSERT INTO grupos (nombre_grupo, descripcion) VALUES (?, ?)';
    db.query(query, [nombre_grupo, descripcion], (error) => {
        if (error) {
            return res.status(500).send('Error al crear el grupo');
        }
        res.status(201).json('Grupo creado exitosamente');
    });
});

app.put('/grupos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre_grupo, descripcion } = req.body;
    const query = 'UPDATE grupos SET nombre_grupo = ?, descripcion = ? WHERE id_grupo = ?';
    db.query(query, [nombre_grupo, descripcion, id], (error) => {
        if (error) {
            return res.status(500).send('Error al actualizar el grupo');
        }
        res.status(200).json('Grupo actualizado exitosamente');
    });
});

app.delete('/grupos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM grupos WHERE id_grupo = ?';
    db.query(query, [id], (error) => {
        if (error) {
            return res.status(500).send('Error al eliminar el grupo');
        }
        res.status(200).json('Grupo eliminado exitosamente');
    });
});


app.post('/miembros', (req, res) => {
    const { id_usuario, id_grupo } = req.body;
    const query = 'INSERT INTO miembrosgrupo (id_usuario, id_grupo) VALUES (?, ?)';
    db.query(query, [id_usuario, id_grupo], (error) => {
        if (error) {
            return res.status(500).send('Error al agregar el miembro al grupo');
        }
        res.status(201).json('Miembro agregado al grupo exitosamente');
    });
});


app.get('/miembros', (req, res) => {
    const query = `
        SELECT u.nombre AS usuario, g.nombre_grupo AS grupo
        FROM miembrosgrupo mg
        JOIN usuarios u ON mg.id_usuario = u.id_usuario
        JOIN grupos g ON mg.id_grupo = g.id_grupo
    `;

    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).send('Error al obtener los miembros del grupo');
        }
        console.log("Datos obtenidos:", results); 
        res.status(200).json(results);
    });
});



app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
