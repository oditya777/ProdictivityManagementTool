console.log('Service routes loaded');

import express from 'express';
import { createService, deleteService, getServiceByNum, getServices, updateService } from '../Controllers/serviceController.js';

const router = express.Router();

router.post('/save', createService);
router.get('/fetch-all', getServices);
router.get('/fetch/:serviceNum', getServiceByNum);
router.put('/update/:serviceNum', updateService);
router.delete('/delete/:serviceNum', deleteService);

export default router;
