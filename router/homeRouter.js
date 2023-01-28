
import { Router } from 'express';
import { 
  /*   home, */
    getTareas, 
    getTareaByID,
    formTarea,
    createTareas, 
    updateTareas,
    deleteTareas 
} from '../controllers/homeController.js'
// from '../controllers/homeControllerAtlas.js'

export const router = Router();

/* router.get('/', home) */
router.get('/', getTareas);
router.get('/editarTarea/:id', getTareaByID)
router.get('/addTarea', formTarea);
router.post('/create', createTareas);
router.post('/actualizar/:id', updateTareas);
router.delete('/delete/:id', deleteTareas);


