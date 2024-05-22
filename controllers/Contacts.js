import Contact from '../models/Contact.js'

export const getAllContacts = async (rq,rs) => {
    await Contact.find()
    .then((contacts) => {
        if(!contacts.length) throw new Error('err');
        console.log(contacts);
        rs.status(200).json({code:200, msg: "Found " + contacts.length + " contacts", contact: contacts});
    })
    .catch((error) => {
        console.log(error);
        rs.status(500).json({code:500, msg: "Unable to find any contacts"});
    });
}

// Usage: http://localhost:3000/api/contacts/search?searchTerm=searchString
export const searchContacts = async (rq,rs) => {
    const regex = new RegExp(rq.query.searchTerm, "i");
    await Contact.find({
        $or: [
            {firstName: regex},
            {lastName: regex},
            {email: regex}
        ]
    })
    .then((contacts) => {
        if(!contacts.length) throw new Error('err');
        console.log(contacts);
        rs.status(200).json({code:200, msg: "Found contacts:", contact: contact});
    })
    .catch((error) => {
        console.log(error);
        rs.status(500).json({code:500, msg: "Unable to find any contacts"});
    });
}

export const getContact = async (rq,rs) => {
    await Contact.findById(rq.params.id)
    .then((contact) => {
        if (!contact) throw new Error('err');
        console.log(contact);
        rs.status(200).json({code:200, msg: "Found contact:", contact: contact});
    })
    .catch((error) => {
        console.log(error);
        rs.status(500).json({code:500, msg: "Unable to find the contact"});
    });
}

export const createContact = async (rq,rs) => {
    await new Contact(rq.body).save()
    .then((contact) => {
        console.log(contact);
        rs.status(201).json({code:201, msg: "Created contact:", contact: contact});
    })
    .catch((error) => {
        console.log(error);
        if (error.code == 11000) 
            return rs.status(500).json({code:500, msg: "Email is already used"});
        rs.status(500).json({code:500, msg: "Unable to create contact"});
    });
}

export const updateContact = async (rq,rs) => {
    await Contact.findOneAndUpdate({_id: rq.params.id}, rq.body, {new: true, runValidators: true})
    .then((contact) => {
        console.log(contact);
        rs.status(200).json({code:200, msg: "Updated contact:", contact: contact});
    })
    .catch((error) => {
        console.log(error);
        if (error.code == 11000) 
            return rs.status(500).json({code:500, msg: "Email is already used"});
        rs.status(500).json({code:500, msg: "Unable to update the contact"});
    });
}

export const deleteContact = async (rq,rs) => {
    await Contact.findByIdAndDelete({_id: rq.params.id})
    .then((contact) => {
        if (!contact) throw new Error('err');
        console.log(contact);
        rs.status(200).json({code:200, msg: "Deleted contact:", contact: contact});
    })
    .catch((error) => {
        console.log(error);
        rs.status(500).json({code:500, msg: "Unable to delete the contact"});
    });
}