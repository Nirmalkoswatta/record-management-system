import express from 'express';
import { addPetRecord, deletePetRecord, getAllPetRecords, getSinglePetRecord, updatePetRecord } from '../controller.js/record.controller.js';

const router = express.Router();

router.post('/petRecords', addPetRecord);

router.get('/petRecords', getAllPetRecords);

router.put('/petRecords/:id', updatePetRecord);

router.delete('/petRecords/:id', deletePetRecord);

router.get('/petRecords/:id', getSinglePetRecord);

export default router;
