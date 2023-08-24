// src/routes/index.ts
import express from 'express';
import { createHouse, getHouseById, updateHouse } from '../endpoints/houseEndpoint';

const router = express.Router();

router.post('/houses', createHouse);
router.get('/houses/:id', getHouseById);
router.put('/houses/:id', updateHouse);

export default router;