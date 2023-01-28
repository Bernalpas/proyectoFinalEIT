import 'dotenv/config';
import mongodb from 'mongodb';

const mongoCliente = mongodb.MongoClient;
let dia = new Date();
let fechaData = dia.toLocaleDateString();


//Formulario para llenar las tarea

/* export const home = (req, res) => {
    res.send('<h1>Mi App de Tareas</h1>')
} */

export const formTarea = (req, res) => {
    res.render('agregarTareas')
}
//Obtenemos las tareas
export const getTareas = (req, res) =>{

    mongoCliente.connect(process.env.MONGOATLAS, (error, db) =>{
        const database = db.db('educaionit');
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{
            console.log(`Conexion correcta a la Database`);
            database.collection('tareas').find({}).toArray((error, result) =>{
                if (error) {
                    throw error;
                }else{
                    res.render('home', { 
                        result
                    })
                }
            })
        }
    });
};


export const getTareaByID = (req, res) => {
    mongoCliente.connect(process.env.MONGOATLAS, (error, db) =>{
        const database = db.db('educaionit');
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{
            console.log(`Conexion correcta a la Database`);

            let ObjectId = mongodb.ObjectId;
            let id = req.params.id;

            database.collection('tareas').findOne({_id: ObjectId(id)}, (error, result) =>{
                if (error) {
                    throw error;
                }else{
                    res.render('editarTarea', { 
                        result
                    })
                }
            })
        }
    });
}


//Creación de las tareas
export const createTareas = (req, res) => {
    
    const { titulo, autor, descripcion, nivel } = req.body;
            
    mongoCliente.connect(process.env.MONGOATLAS, (error, db) =>{
        const database = db.db('educaionit');
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{ 

        console.log(`Conexion correcta a la Database`);        
            database.collection('tareas').insertOne({ titulo, autor, descripcion, nivel, fecha: fechaData }, (error, result) => {
                if (error) {
                    throw error;
                }else{
                    res.render('agregarTareas')
                }
            })  
        } 
    }); 
}

//Actualizar Tareas
export const updateTareas = (req, res) =>{

    mongoCliente.connect(process.env.MONGOATLAS, (error, db) =>{
        const database = db.db('educaionit');
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{
            console.log(`Conexion correcta a la Database`);

            let ObjectId = mongodb.ObjectId;
            let id = req.params.id;

            console.log(ObjectId(id));
            
            const { titulo, autor, descripcion, nivel} = req.body;

            database.collection('tareas').findOne({_id: ObjectId(id)}, {$set: {titulo, autor, descripcion, nivel}} ,(error, result) => {
                error? console.log(error.message) :
                database.collection('tareas').replaceOne({_id: ObjectId(id)},{titulo, autor, descripcion, nivel, fecha: fechaData}, )
                //console.log(req.body)
                    res.redirect('/')
                })
        }
    });
};

//Eliminar tareas
export const deleteTareas = (req, res) => {

    mongoCliente.connect(process.env.MONGOATLAS, (error, db) =>{
        const database = db.db('educaionit');
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{
            console.log(`Conexion correcta a la Database`);
            
            const ObjectId = mongodb.ObjectId;
            const id = req.params.id;

        database.collection('tareas').deleteOne({_id: ObjectId(id)}, (error, result) =>{
                if (error) {
                    throw error;
                }else{
                    res.json({message: "Tarea eliminada!"})
                }
            })
        }
    });
}
