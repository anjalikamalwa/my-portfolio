import express from 'express';
import { sentMessage } from '../controllers/contactcontroller.js';
 export const router = express.Router();


 router.post("/",sentMessage)