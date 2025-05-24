import { Router } from "express";
import {getAllNotes, getNoteById, createNote, deleteNote, updateNote} from '../controllers/note.controllers.js'



const noteRouter = Router();



noteRouter.get('/', getAllNotes);
noteRouter.get('/:id', getNoteById);
noteRouter.post('/', createNote);
noteRouter.put('/:id', updateNote);
noteRouter.delete('/:id', deleteNote);



export default noteRouter;