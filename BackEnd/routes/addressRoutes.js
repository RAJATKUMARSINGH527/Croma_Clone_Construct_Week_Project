const express = require('express');
const AddressRouter = express.Router();
const {createAddress,getAllAddresses,getAddressById,updateAddress,deleteAddress} = require('../controllers/addressController');


AddressRouter.post('/', createAddress);


AddressRouter.get('/', getAllAddresses);


AddressRouter.get('/:id', getAddressById);

AddressRouter.put('/:id', updateAddress);


AddressRouter.delete('/:id', deleteAddress);

module.exports = AddressRouter;