const { ContactDto } = require("../dto/contact.dto")

class ContactRepository {
    constructor(dao){
        this.dao = dao
    }

    get = async ()=>{
        let result = await this.dao.get()
        return result
    }
    create = async (newContact)=>{
        let contactToInsert = new ContactDto(newContact)
        let result = await this.dao.create(contactToInsert)
        return result
    }
}

module.exports = ContactRepository
