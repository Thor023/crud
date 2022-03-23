//1- Crear un servidor en Node.
const express = require('express')
const app = express();
const url = require('url');
const fs = require('fs');
const path = require('path');
app.listen(8080, () => {
    console.log('El servidor está inicializado en el puerto 8080')
});

//Disponibilizar ruta Servidor
app.get('/', (req, res)=> {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('index.html', 'utf-8', (err,data )=> {
        res.write(data);
        res.end();
    });
});

//Creación de Fecha
let date = new Date()

let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()

if(month < 10){
    let fecha = (`${day}-0${month}-${year}`);
    console.log(fecha);
}else{
    let fecha = (`${day}-${month}-${year}`);
    console.log(fecha);
};




//2 Disponibilizar una ruta para crear un archivo a partir de los parámetros de la consulta recibida
app.get("/crear", (req,res) => {
    const parametros = url.parse(req.url, true).query;
    const archivo = parametros.archivo;
    const contenido = parametros.contenido;

    fs.writeFile(archivo, contenido, 'utf8', () =>{
        res.write('Archivo creado con Exito')
        res.end();
    });
    // fs.readFile(archivo, 'utf-8', (err, data)=>{
    //     fs.writeFile(archivo, data , 'utf-8', ()=>{

    //     })
    // });
});
//3 Disponibilizar una ruta para devolver el contenido de un archivo cuyo nombre es declarado en los parámetros de la consulta recibida
app.get("/leer", (req, res) =>{
    const {archivo} = url.parse(req.url, true).query;
    fs.readFile(archivo, 'utf-8',(err,data) => {
        res.write(data);
        res.end();
    });
});
//4 Disponibilizar una ruta para renombrar un archivo, cuyo nombre y nuevo nombre es declarado en los parámetros de la consulta recibida
app.get("/renombrar", (req, res)=> {
    const {nombre} = url.parse(req.url, true).query;
    const {nuevoNombre} = url.parse(req.url, true).query;
    const fs = require('fs')
    fs.rename (nombre, nuevoNombre,  (err,data)=> {
        res.write(`El archivo antiguo ${nombre}  ha sido renombrado por ${nuevoNombre}`);
        res.end();
    });
});
//5 Disponibilizar una ruta para eliminar un archivo, cuyo nombre es declarado en los parámetros de la consulta recibida.
app.get("/eliminar", (req, res)=> {
    const {archivo} = url.parse(req.url, true).query;
    const fs = require('fs')
    fs.unlink(archivo, (err,data) =>{
        res.write(`Tu solicitud para eliminar el archivo ${archivo}, se está
        procesando`);
        setTimeout(function(){
            res.write(`Archivo ${archivo} eliminado con exito`);
        },3000);
        res.end();
    });
});
//6 Como poner el mensaje de Fracaso??

//7 Agrega la fecha actual al comienzo del contenido de cada archivo creado en formato “dd/mm/yyyy”. Considera que si el día o el mes es menor a 10 concatenar un “0” a la izquierda

//8 En la ruta para renombrar, devuelve un mensaje de éxito incluyendo el nombre anterior del archivo y su nuevo nombre de forma dinámica .ok

//9 En el mensaje de respuesta de la ruta para eliminar un archivo, devuelve el siguiente mensaje: “Tu solicitud para eliminar el archivo <nombre_archivo> se está procesando”, y luego de 3 segundos envía el mensaje de éxito mencionando el nombre del archivo eliminado. 