import express from 'express';
import { getCustomerById, getCustomers, postCustomer, updateCustomer } from '../controllers/customersController.js';

const customerRouter = express.Router();

customerRouter.get("/customers", getCustomers);
customerRouter.get("/customers/:id", getCustomerById);
customerRouter.put("/customers/:id", updateCustomer);
customerRouter.post("/customers" , postCustomer);

export default customerRouter;