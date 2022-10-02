import express from 'express';
import { getCustomers, postCustomer } from '../controllers/customersController.js';

const customerRouter = express.Router();

customerRouter.get("/customers", getCustomers);
customerRouter.post("/customers" , postCustomer);

export default customerRouter;