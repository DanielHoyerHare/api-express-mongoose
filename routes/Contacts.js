import {getAllContacts, getContact, searchContacts, createContact, updateContact, deleteContact} from '../controllers/Contacts.js'
import express from 'express';

const router = express.Router();

router.get('/', getAllContacts);
//searchContacts skal være før getContact ellers rammer den altid getContact fordi den tror query er et id
router.get('/search', searchContacts);
router.get('/:id', getContact);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;
